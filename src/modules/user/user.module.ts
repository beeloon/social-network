import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { userProvider } from '../../db/entities/Users/users.provider';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService, ...userProvider],
})
export class UserModule {}
