import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { PostModule } from './modules/post/post.module';
import { FollowerModule } from './modules/follower/follower.module';

import commonOptions from './config';
import sqlOptions from './config/sql.config';
import mongoOptions from './config/mongo.config';

import { RefreshToken } from './modules/auth/entities/reftesh-token.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [commonOptions, sqlOptions, mongoOptions],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('mongo.connectionOptions.uri'),
        useCreateIndex: true,
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        ...configService.get('sql.connectionOptions'),
        entities: [RefreshToken],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    UserModule,
    PostModule,
    AuthModule,
    FollowerModule,
  ],
})
export class AppModule {}
