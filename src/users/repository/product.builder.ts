import { User, UserId, UserInfo, UserMessages } from '../user';
import { UserEntity } from './user.entity';

export class UserIdBuilder {
  static convertToBusiness(userEntity: UserEntity): UserId {
    const user = new User();
    user.id = userEntity.id;
    user.email = userEntity.email;
    user.name = userEntity.name;
    user.surname = userEntity.surname;
    user.firebaseUID = userEntity.firebase_uid;
    user.phone = userEntity.phone;
    return user;
  }
}

export class UserInfoBuilder {
  static convertToBusiness(userEntity: UserEntity): UserInfo {
    const user = new User();
    user.initialMessage = userEntity.initial_message;
    return user;
  }
}

export class UserMessagesBuilder {
  static convertToBusiness(userEntity: UserEntity): UserMessages {
    const messages = new UserMessages();
    messages.initialMessage = {
      title: userEntity.messages?.initial_message?.title,
      message: userEntity.messages?.initial_message?.message,
    };
    return messages;
  }
}
