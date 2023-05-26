import { FirebaseModule } from '../firebase/firebase.module';
import { LightRepository } from './light.repository';
import { LightController } from './light.controller';
import { LightEntity, LightSchema } from './light.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { LightService } from './light.service';
import { UsersModule } from 'src/users/users.module';
import { EventsBrokerModule } from 'src/eventsBroker/eventsBroker.module';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forFeature([
      { name: LightEntity.name, schema: LightSchema },
    ]),
    FirebaseModule,
    EventsBrokerModule,
  ],
  providers: [LightService, LightRepository],
  controllers: [LightController],
})
export class LightModule {}
