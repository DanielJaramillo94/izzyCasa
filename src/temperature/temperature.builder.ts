import { Temperature } from './temperature';
import { TemperatureEntity } from './temperature.entity';

export class TemperatureBuilder {
  static convertToBusiness(temperatureEntity: TemperatureEntity): Temperature {
    const temperature = new Temperature();
    temperature.id = temperatureEntity.id;
    temperature.location = temperatureEntity.location;
    temperature.temperature = temperatureEntity.temperature;
    temperature.time = temperatureEntity.time;
    return temperature;
  }
}
