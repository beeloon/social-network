import { Module } from '@nestjs/common';

import { FollowerController } from './follower.controller';
import { FollowerService } from './follower.service';

@Module({
  imports: [],
  controllers: [FollowerController],
  providers: [FollowerService],
})
export class FollowerModule {}
