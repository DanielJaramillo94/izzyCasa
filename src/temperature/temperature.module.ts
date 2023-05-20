import { FirebaseModule } from '../firebase/firebase.module';
import { TemperatureRepository } from './temperature.repository';
import { TemperatureController } from './temperature.controller';
import { TemperatureEntity, TemperatureSchema } from './temperature.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { TemperatureService } from './temperature.service';
import { UsersModule } from 'src/users/users.module';
import { EventsBrokerModule } from 'src/eventsBroker/eventsBroker.module';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forFeature([
      { name: TemperatureEntity.name, schema: TemperatureSchema },
    ]),
    FirebaseModule,
    EventsBrokerModule
  ],
  providers: [TemperatureService, TemperatureRepository],
  controllers: [TemperatureController],
})
export class TemperatureModule {}
