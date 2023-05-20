import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { FirebaseModule } from './firebase/firebase.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { NoContentInterceptor } from './interceptors/transform.interceptor';
import { TemperatureModule } from './temperature/temperature.module';
import { EventsBrokerModule } from './eventsBroker/eventsBroker.module';
import { LightModule } from './Light/light.modulo';

@Module({
  imports: [
    FirebaseModule,
    AuthModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        uri: config.get<string>('MONGODB_CONNECTION'),
      }),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `./env/${process.env.NODE_ENV}.env`,
    }),
    TemperatureModule,
    UsersModule,
    EventsBrokerModule, 
    LightModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: NoContentInterceptor,
    },
  ],
})
export class AppModule {}
