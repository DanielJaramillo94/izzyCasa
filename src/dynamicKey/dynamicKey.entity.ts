import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type DynamicKeyDocument = HydratedDocument<DynamicKeyEntity>;

@Schema({
  collection: 'dynamic-key',
})
export class DynamicKeyEntity {
  id: string;

  @Prop({ required: true })
  code: number;

  @Prop({
    required: true,
    type: Number,
  })
  time: number;
}

export const DynamicKeySchema = SchemaFactory.createForClass(DynamicKeyEntity);
