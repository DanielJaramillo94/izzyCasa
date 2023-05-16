import { Injectable } from '@nestjs/common';
import {
  UserIdBuilder,
  UserInfoBuilder,
  UserMessagesBuilder,
} from './repository/product.builder';
import { UserId, UserInfo, UserMessages } from './user';
import { UsersRepository } from './repository/users.repository';

@Injectable()
export class UsersService {
  constructor(private userRepository: UsersRepository) {}

  async getUserIdByFirebaseUId(firebaseUId: string): Promise<UserId | null> {
    const user = await this.userRepository.getByFirebaseUId(firebaseUId);
    if (user == null) {
      return null;
    }
    return UserIdBuilder.convertToBusiness(user);
  }

  async getUserInfo(userPhone: string): Promise<UserInfo | null> {
    const userEntity = await this.userRepository.getByPhone(userPhone);
    if (userEntity == null) {
      return null;
    }
    return UserInfoBuilder.convertToBusiness(userEntity);
  }

  async getUserMessages(userPhone: string): Promise<UserMessages | null> {
    const userEntity = await this.userRepository.getByPhone(userPhone);
    if (userEntity == null) {
      return null;
    }
    return UserMessagesBuilder.convertToBusiness(userEntity);
  }
}
