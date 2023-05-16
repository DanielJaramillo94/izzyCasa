import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TemperatureDocument = HydratedDocument<TemperatureEntity>;

@Schema({
  collection: 'temperature',
})
export class TemperatureEntity {
  id: string;

  @Prop({ required: true })
  location: string;

  @Prop({
    required: true,
    type: Number,
  })
  temperature: number;

  @Prop({
    required: true,
    type: Number,
  })
  time: number;
}

export const TemperatureSchema =
  SchemaFactory.createForClass(TemperatureEntity);
