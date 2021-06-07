import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { usersProviders } from '../../db/entities/Users/users.provider';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService, ...usersProviders],
})
export class UserModule {}
