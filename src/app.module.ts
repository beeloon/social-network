import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { PostModule } from './modules/post/post.module';
import { FollowerModule } from './modules/follower/follower.module';
import { Users } from './db/entities/Users/user';
import { SequelizeDBModule } from './db/db.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    //MongooseModule.forRoot(process.env.MONGO_DB_URI, { useCreateIndex: true }),
    SequelizeDBModule,
    UserModule,
    PostModule,
    AuthModule,
    FollowerModule,
  ],
})
export class AppModule {}
