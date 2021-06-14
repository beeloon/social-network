import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { PostModule } from './modules/post/post.module';
import { FollowerModule } from './modules/follower/follower.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './database/entities/user';
import { Followers } from './database/entities/followers';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/social-network', {
      useCreateIndex: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async () => ({
        type: 'mysql',
        host: process.env.SQL_DB_HOST,
        port: +process.env.SQL_DB_PORT,
        username: process.env.SQL_DB_USERNAME,
        password: process.env.SQL_DB_PASSWORD,
        database: process.env.SQL_DB_DATABASE,
        entities: [User, Followers],
        synchronize: true,
        logging: ['query', 'error'],
        logger: 'file',
      }),
    }),
    UserModule,
    PostModule,
    AuthModule,
    FollowerModule,
  ],
})
export class AppModule {}
