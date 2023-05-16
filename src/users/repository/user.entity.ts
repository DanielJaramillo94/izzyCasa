import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { UserMessages } from '../user';

export type UserDocument = HydratedDocument<UserEntity>;

@Schema({
  collection: 'users',
})
export class UserEntity {
  id: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  name: string;

  @Prop({
    required: true,
  })
  surname: string;

  @Prop({
    required: true,
  })
  firebase_uid: string;

  @Prop({
    required: true,
  })
  phone: string;

  @Prop()
  initial_message: string;

  @Prop({
    type: Object,
  })
  messages: {
    initial_message: {
      title: string;
      message: string;
    };
  };
}

export const UserSchema = SchemaFactory.createForClass(UserEntity);
