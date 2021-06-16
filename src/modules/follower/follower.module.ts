import { Module } from '@nestjs/common';

import { FollowerController } from './follower.controller';
import { FollowerService } from './follower.service';
import { DatabaseModule } from 'src/database/database.module';
import { followerProvider, userProvider } from 'src/database/providers';

@Module({
  imports: [DatabaseModule],
  controllers: [FollowerController],
  providers: [FollowerService, ...followerProvider, ...userProvider],
})
export class FollowerModule {}
