import { User } from './db/entities/Users/user';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { PostModule } from './modules/post/post.module';
import { FollowerModule } from './modules/follower/follower.module';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_DB_URI, {
      useCreateIndex: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'mysql',
        host: process.env.SQL_DB_HOST,
        port: +process.env.SQL_DB_PORT,
        username: process.env.SQL_DB_USERNAME,
        password: process.env.SQL_DB_PASSWORD,
        database: process.env.SQL_DB_DATABASE,
        entities: [User],
      }),
    }),
    UserModule,
    PostModule,
    AuthModule,
    FollowerModule,
  ],
})
export class AppModule {}
