import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { PostModule } from './modules/post/post.module';
import { FollowerModule } from './modules/follower/follower.module';

import configuration from './config';

import { RefreshToken } from './entities';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
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
