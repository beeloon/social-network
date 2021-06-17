import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DatabaseModule } from './database/database.module';

import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { PostModule } from './modules/post/post.module';
import { FollowerModule } from './modules/follower/follower.module';

import configuration from './config';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration] }),
    DatabaseModule,
    UserModule,
    PostModule,
    AuthModule,
    FollowerModule,
  ],
})
export class AppModule {}
