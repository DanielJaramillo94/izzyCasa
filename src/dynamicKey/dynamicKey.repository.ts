import { DynamicKey } from './dynamicKey';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DynamicKeyEntity, DynamicKeyDocument } from './dynamicKey.entity';

@Injectable()
export class DynamicKeyRepository {
  constructor(
    @InjectModel(DynamicKeyEntity.name)
    private dynamicKeyModel: Model<DynamicKeyDocument>,
  ) {}

  async getAll(): Promise<DynamicKeyEntity[]> {
    return await this.dynamicKeyModel.find().exec();
  }

  async get(id:string): Promise<DynamicKeyEntity | null>{
    return await this.dynamicKeyModel.findById(id).exec();
  }

  async save(dynamicKey: DynamicKey): Promise<DynamicKeyEntity> {
    const createdLight = new this.dynamicKeyModel(dynamicKey);
    return await createdLight.save();
  }

  async update(dynamicKey: DynamicKey): Promise<DynamicKeyEntity> {
    return await this.dynamicKeyModel.findByIdAndUpdate(dynamicKey.id, dynamicKey, {
      new: true,
      upsert: true,
    });
  }
}