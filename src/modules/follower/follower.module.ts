import { Module } from '@nestjs/common';

import { FollowerController } from './follower.controller';
import { FollowerService } from './follower.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Followers } from '../../db/entities/Followers/followers';

@Module({
  imports: [TypeOrmModule.forFeature([Followers])],
  controllers: [FollowerController],
  providers: [FollowerService],
})
export class FollowerModule {}
