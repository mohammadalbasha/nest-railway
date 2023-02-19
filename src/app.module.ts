import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config from './config/configuration';
import { MongooseModule } from '@nestjs/mongoose';
import { CacheModule } from '@nestjs/common';
import * as redisStore from 'cache-manager-redis-store';
import type { RedisClientOptions } from "redis";
import { UsersModule } from './users/users.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true
    }),
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('mongodb').url,
       connectionFactory: (connection) => {
          return connection;
        } 
      }),
      inject: [ConfigService]
    }),
    // CacheModule.register<RedisClientOptions>({ 
    //   store: redisStore, 
    //   isGlobal: true,
    //   url:"redis://localhost:6379",
    //   username:"mohammadalbacha",
    //   password:"!@#KaKa!@#123"
      
    // }),

  // CacheModule.register({
  //   isGlobal: true
  // }),
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
