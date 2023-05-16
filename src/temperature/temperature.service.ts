import { TemperatureBuilder } from './temperature.builder';
import { TemperatureRepository } from './temperature.repository';
import { Temperature } from './temperature';
import { Injectable } from '@nestjs/common';
import { TemperatureEntity } from './temperature.entity';
@Injectable()
export class TemperatureService {
  constructor(private temperatureRepository: TemperatureRepository) {}

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
}
