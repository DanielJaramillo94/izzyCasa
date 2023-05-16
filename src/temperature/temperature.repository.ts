import { Temperature } from './temperature';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TemperatureEntity, TemperatureDocument } from './temperature.entity';

@Injectable()
export class TemperatureRepository {
  constructor(
    @InjectModel(TemperatureEntity.name)
    private temperatureModel: Model<TemperatureDocument>,
  ) {}

  async getAll(): Promise<TemperatureEntity[]> {
    return await this.temperatureModel.find().exec();
  }

  async save(temperature: Temperature): Promise<TemperatureEntity> {
    const createdTemperature = new this.temperatureModel(temperature);
    return await createdTemperature.save();
  }
}
