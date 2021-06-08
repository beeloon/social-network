import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { PostModule } from './modules/post/post.module';
import { FollowerModule } from './modules/follower/follower.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './db/entities/Users/user';

@Module({
  imports: [
    //MongooseModule.forRoot(process.env.MONGO_DB_URI, { useCreateIndex: true }),
    TypeOrmModule.forRootAsync({
      useFactory: async () => ({
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
