import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../database/entities/user-entity';
import { DatabaseModule } from 'src/database/database.module';
import { userProviders } from 'src/database/providers/create-user-providers';
@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [UserService, ...userProviders],
})
export class UserModule {}
