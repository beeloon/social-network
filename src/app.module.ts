import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { PostModule } from './modules/post/post.module';
import { FollowerModule } from './modules/follower/follower.module';
import { SequelizeDBModule } from './db/db.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://Dmitriy:1234321vvv@cluster0.hsiep.mongodb.net/myDatabase?retryWrites=true&w=majority',
      {
        useCreateIndex: true,
      },
    ),
    // SequelizeDBModule,
    //  UserModule,
    PostModule,
    // AuthModule,
    // FollowerModule,
  ],
})
export class AppModule {}
