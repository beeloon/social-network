import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UsersService } from './user.service';
import { usersProviders } from '../../db/entities/Users/users.provider';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UsersService, ...usersProviders],
})
export class UserModule {}
