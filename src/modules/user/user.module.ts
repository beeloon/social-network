import { Module } from '@nestjs/common';

import { UserController } from './user.controller';
import { UserService } from './user.service';

import { DatabaseModule } from 'src/database/database.module';
import { userProviders } from 'src/database/providers/';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [UserService, ...userProviders],
})
export class UserModule {}
