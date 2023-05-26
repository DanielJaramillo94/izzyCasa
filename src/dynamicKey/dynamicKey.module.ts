import { FirebaseModule } from '../firebase/firebase.module';
import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { DynamicKeyService } from './dynamicKey.service';
import { DynamicKeyEntity, DynamicKeySchema } from './dynamicKey.entity';
import { DynamicKeyRepository } from './dynamicKey.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { DynamicKeyController } from './dynamicKey.controller';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forFeature([
      { name: DynamicKeyEntity.name, schema: DynamicKeySchema },
    ]),
    FirebaseModule,
  ],
  providers: [DynamicKeyService, DynamicKeyRepository],
  controllers: [DynamicKeyController],
  exports: [DynamicKeyService],
})
export class DynamicKeyModule {}
