import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type LightDocument = HydratedDocument<LightEntity>;

@Schema({
  collection: 'light',
})
export class LightEntity {
  id: string;

  @Prop({ required: true })
  location: string;

  @Prop({ required: true })
  label: string;

  @Prop({
    required: true,
    type: Boolean,
  })
  status: boolean;
}

export const LightSchema = SchemaFactory.createForClass(LightEntity);
