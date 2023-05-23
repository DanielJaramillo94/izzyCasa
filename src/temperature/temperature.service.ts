import { TemperatureBuilder } from './temperature.builder';
import { TemperatureRepository } from './temperature.repository';
import { Temperature } from './temperature';
import { Injectable } from '@nestjs/common';
import { TemperatureEntity } from './temperature.entity';
import { EventsBrokerService } from 'src/eventsBroker/eventsBroker.service';
import { get } from 'http';
@Injectable()
export class TemperatureService {
  constructor(private temperatureRepository: TemperatureRepository,
    private readonly eventsBrokerService: EventsBrokerService
    ) {
    let sus = this.eventsBrokerService.subscribeToTopic(["temperature/livingroom"]);
    sus.on('message', (topic, message) => {
      this.getTemperature(topic, message.toString());
    });
  }

  async getAll(): Promise<Temperature[]> {
    return (await this.temperatureRepository.getAll()).map(
      (temperatureEntity: TemperatureEntity) =>
        TemperatureBuilder.convertToBusiness(temperatureEntity),
    );
  }

  async create(temperature: Temperature): Promise<Temperature | undefined> {
    const newTemperature = await this.temperatureRepository.save(temperature);
    return TemperatureBuilder.convertToBusiness(newTemperature);
  }

  async getTemperature(topic:string, message:string){
    const temperature = new Temperature();
    temperature.temperature = parseInt(message);
    temperature.location = topic.split("/")[1];
    temperature.time = new Date().getTime();
    this.create(temperature);
  }
}
