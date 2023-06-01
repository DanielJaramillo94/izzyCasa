import { FirebaseModule } from '../firebase/firebase.module';
import { MongooseModule } from '@nestjs/mongoose';
import { DynamicKeyEntity, DynamicKeySchema } from 'src/dynamicKey/dynamicKey.entity';
import { Module } from '@nestjs/common';
import { MainDoorService } from './mainDoor.service';
import { UsersModule } from 'src/users/users.module';
import { EventsBrokerModule } from 'src/eventsBroker/eventsBroker.module';
import { DynamicKeyModule } from 'src/dynamicKey/dynamicKey.module'; 
import { MainDoorController } from './mainDoor.controller';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forFeature([
      { name: DynamicKeyEntity.name, schema: DynamicKeySchema },
    ]),
    FirebaseModule,
    EventsBrokerModule,
    DynamicKeyModule
  ],
  providers: [MainDoorService],
  controllers: [MainDoorController],
})
export class MainDoorModule {}