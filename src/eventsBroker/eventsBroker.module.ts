import { FirebaseModule } from '../firebase/firebase.module';
import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { EventsBrokerService } from './eventsBroker.service';

@Module({
  imports: [UsersModule, FirebaseModule],
  providers: [EventsBrokerService],
  exports: [EventsBrokerService],
})
export class EventsBrokerModule {}
