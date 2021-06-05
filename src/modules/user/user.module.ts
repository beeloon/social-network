import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { userProviders } from '../../db/entities/Users/users.provider';
import { SQLDatabaseModule } from '../../db/db.module';

@Module({
  imports: [SQLDatabaseModule],
  controllers: [UserController],
  providers: [UserService, ...userProviders],
})
export class UserModule {}
