import { DynamicKey } from './dynamicKey';
import { DynamicKeyEntity } from './dynamicKey.entity';

export class DynamicKeyBuilder {
  static convertToBusiness(dynamicKeyEntity: DynamicKeyEntity): DynamicKey {
    const dynamicKey = new DynamicKey();
    dynamicKey.id = dynamicKeyEntity.id;
    dynamicKey.code = dynamicKeyEntity.code;
    dynamicKey.time = dynamicKeyEntity.time;
    return dynamicKey;
  }
}
