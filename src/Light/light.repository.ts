import { Light } from './light';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LightEntity, LightDocument } from './light.entity';

@Injectable()
export class LightRepository {
  constructor(
    @InjectModel(LightEntity.name)
    private lightModel: Model<LightDocument>,
  ) {}

  async getAll(): Promise<LightEntity[]> {
    return await this.lightModel.find().exec();
  }

  async get(id:string): Promise<LightEntity | null>{
    return await this.lightModel.findById(id).exec();
  }

  async getByLocation(location:string): Promise<LightEntity | null>{
    return await this.lightModel.find({location:location}).findOne();
  }

  async save(light: Light): Promise<LightEntity> {
    const createdLight = new this.lightModel(light);
    return await createdLight.save();
  }

  async update(light: Light): Promise<LightEntity> {
    return await this.lightModel.findByIdAndUpdate(light.id, light, {
      new: true,
      upsert: true,
    });
  }
}