import { Module } from '@nestjs/common';

import { FollowerController } from './follower.controller';
import { FollowerService } from './follower.service';
import { DatabaseModule } from '../../database/database.module';
import { followerProviders, userProviders } from 'src/database/providers';

@Module({
  imports: [DatabaseModule],
  controllers: [FollowerController],
  providers: [FollowerService, ...followerProviders, ...userProviders],
})
export class FollowerModule {}
