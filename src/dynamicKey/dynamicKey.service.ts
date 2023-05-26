import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { DynamicKey } from './dynamicKey';
import { DynamicKeyRepository } from './dynamicKey.repository';
import { DynamicKeyEntity } from './dynamicKey.entity';
import { DynamicKeyBuilder } from './dynamicKey.builder';
import { BussisnessException } from 'src/exceptions/bussisness-exception.class';
import { QueryInconsistency } from 'src/exceptions/query-inconsistency';
import { StringUtils } from './../utils/strings/string.utils';

@Injectable()
export class DynamicKeyService {
  constructor(private dynamicKeyRepository: DynamicKeyRepository) {}

  @Cron(CronExpression.EVERY_30_SECONDS)
  async manageDynamicKey() {
    const code = this.generateDynamicKey();
    const dynamicKey = new DynamicKey();
    dynamicKey.code = code;
    dynamicKey.time = new Date().getTime();
    const dynamicKeys = await this.getAll();

    if (dynamicKeys.length == 0) {
      this.create(dynamicKey);
    } else {
      dynamicKey.id = dynamicKeys[0].id;
      this.update(dynamicKey);
    }
  }

  generateDynamicKey() {
    const minm = 100000;
    const maxm = 999999;
    return Math.floor(Math.random() * (maxm - minm + 1)) + minm;
  }

  async create(dynamicKey: DynamicKey): Promise<DynamicKey | undefined> {
    const newDynamicKey = await this.dynamicKeyRepository.save(dynamicKey);
    return DynamicKeyBuilder.convertToBusiness(newDynamicKey);
  }

  async getAll(): Promise<DynamicKey[]> {
    return (await this.dynamicKeyRepository.getAll()).map(
      (dynamicKeyEntity: DynamicKeyEntity) =>
        DynamicKeyBuilder.convertToBusiness(dynamicKeyEntity),
    );
  }

  async update(newDynamicKey: DynamicKey): Promise<DynamicKey | null> {
    if (!newDynamicKey.id) {
      throw this._throwMissingIdException();
    }

    const dynamicKey = await this.get(newDynamicKey.id);

    if (!dynamicKey) {
      throw this._throwMissingIdException();
    }

    const updatedProduct = await this.dynamicKeyRepository.update(
      newDynamicKey,
    );

    if (!updatedProduct) {
      throw this._throwMissingIdException();
    }

    return DynamicKeyBuilder.convertToBusiness(updatedProduct);
  }

  async get(dynamicKeyId: string): Promise<DynamicKey | null> {
    const dynamicKey = await this.dynamicKeyRepository.get(dynamicKeyId);
    if (dynamicKey == null) {
      return null;
    }
    return DynamicKeyBuilder.convertToBusiness(dynamicKey);
  }

  private _throwMissingIdException() {
    return new BussisnessException(
      QueryInconsistency.missingId(
        StringUtils.toHumanString(DynamicKey.constructor.name),
      ),
    );
  }
}
