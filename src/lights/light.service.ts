import { LightBuilder } from './light.builder';
import { LightRepository } from './light.repository';
import { Light } from './light';
import { Injectable } from '@nestjs/common';
import { LightEntity } from './light.entity';
import { QueryInconsistency } from '../exceptions/query-inconsistency';
import { BussisnessException } from '../exceptions/bussisness-exception.class';
import { EventsBrokerService } from 'src/eventsBroker/eventsBroker.service';
import { StringUtils } from '../utils/strings/string.utils';
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

  async create(light: Light): Promise<Light | undefined> {
    const newTemperature = await this.lightRepository.save(light);
    return LightBuilder.convertToBusiness(newTemperature);
  }

  async get(lightId: string): Promise<Light | null> {
    const light = await this.lightRepository.get(lightId);
    if (light == null) {
      return null;
    }
    return LightBuilder.convertToBusiness(light);
  }

  async update(newLight: Light): Promise<Light | null> {
    if (!newLight.location) {
      throw this._throwMissingIdException();
    }

    const light = await this.getByLocation(newLight.location);

    if (!light) {
      throw this._throwMissingIdException();
    }

    light.status = newLight.status;

    const updatedProduct = await this.lightRepository.update(light);

    if (!updatedProduct) {
      throw this._throwMissingIdException();
    }

    this.eventsBroker.publishMessage(
      'light/' + light.location.toLowerCase(),
      light.status ? 'ON' : 'OFF',
    );

    return LightBuilder.convertToBusiness(updatedProduct);
  }

  async getByLocation(location: string): Promise<Light | null> {
    return this.lightRepository.getByLocation(location);
  }

  private _throwMissingIdException() {
    return new BussisnessException(
      QueryInconsistency.missingId(
        StringUtils.toHumanString(Light.constructor.name),
      ),
    );
  }
}
