import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { SequelizeModule } from '@nestjs/sequelize';

import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { PostModule } from './modules/post/post.module';
import { FollowerModule } from './modules/follower/follower.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_DB_URI, { useCreateIndex: true }),
    SequelizeModule.forRoot({
      dialect: process.env.SQL_DB_DIALECT as any,
      host: process.env.SQL_DB_HOST,
      port: +process.env.SQL_DB_PORT,
      username: process.env.SQL_DB_USERNAME,
      password: process.env.SQL_DB_PASSWORD,
      database: process.env.SQL_DB_DATABASE,
      models: [],
    }),
    UserModule,
    PostModule,
    AuthModule,
    FollowerModule,
  ],
})
export class AppModule {}
