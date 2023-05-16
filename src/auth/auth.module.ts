import { FirebaseModule } from './../firebase/firebase.module';
import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule, FirebaseModule],
})
export class AuthModule {}
