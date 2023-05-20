import { Light } from './light'; 
import { LightEntity } from './light.entity'; 

export class LightBuilder {
  static convertToBusiness(lightEntity: LightEntity): Light {
    const light = new Light();
    light.id = lightEntity.id;
    light.location = lightEntity.location;
    light.status = lightEntity.status;
    return light;
  }
}