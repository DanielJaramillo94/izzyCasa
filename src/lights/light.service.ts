import { LightBuilder } from './light.builder';
import { LightRepository } from './light.repository';
import { Light } from './light';
import { Injectable } from '@nestjs/common';
import { LightEntity } from './light.entity';
import { BussisnessException } from '../exceptions/bussisness-exception.class';
import { EventsBrokerService } from 'src/eventsBroker/eventsBroker.service';
import { LightsInconsistency } from 'src/exceptions/lights-inconsistency';
@Injectable()
export class LightService {
  constructor(
    private lightRepository: LightRepository,
    private eventsBroker: EventsBrokerService,
  ) {}

  async getAll(): Promise<Light[]> {
    return (await this.lightRepository.getAll()).map(
      (LightEntity: LightEntity) => LightBuilder.convertToBusiness(LightEntity),
    );
  }

  async changeState(location: string, status: boolean) {
    if (status === null || status === undefined) {
      //TODO: make this validation in controller, using a validator pipe
      throw new BussisnessException(LightsInconsistency.missingNewStatus());
    }

    const light = await this.getByLocation(location);

    if (!light) {
      throw new BussisnessException(LightsInconsistency.missingLocation());
    }

    light.status = status;
    const updatedLight = await this.lightRepository.update(light);
    this.eventsBroker.publishMessage(
      'lights/' + light.location.toLowerCase(),
      light.status ? '1' : '0',
    );

    return LightBuilder.convertToBusiness(updatedLight);
  }

  async getByLocation(location: string): Promise<Light | null> {
    return this.lightRepository.getByLocation(location);
  }
}
