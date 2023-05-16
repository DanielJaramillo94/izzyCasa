import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserId } from '../user';
import { UserEntity, UserDocument } from './user.entity';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectModel(UserEntity.name)
    private userModel: Model<UserDocument>,
  ) {}

  async getByFirebaseUId(firebaseUId: string): Promise<UserEntity | null> {
    return await this.userModel.findOne({ firebase_uid: firebaseUId }).exec();
  }

  async getByPhone(userPhone: string): Promise<UserEntity | null> {
    return await this.userModel.findOne({ phone: userPhone }).exec();
  }

  async save(user: UserId): Promise<UserEntity> {
    const createdUser = new this.userModel(user);
    return await createdUser.save();
  }

  async delete(userId: string): Promise<void> {
    await this.userModel.findByIdAndRemove(userId).exec();
  }

  async update(user: UserId): Promise<UserEntity | null> {
    const finded = await this.userModel.findById(user.id).exec();
    if (!finded) {
      return null;
    }
    return await this.userModel.findByIdAndUpdate(user.id, user, {
      new: true,
      upsert: true,
    });
  }
}
