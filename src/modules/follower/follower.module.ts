import { Module } from '@nestjs/common';

import { FollowerController } from './follower.controller';
import { FollowerService } from './follower.service';
import { DatabaseModule } from '../../database/database.module';
import { followerProviders } from '../../database/providers/create-follower-providers';
import { UserModule } from '../user/user.module';

@Module({
  imports: [DatabaseModule],
  controllers: [FollowerController],
  providers: [FollowerService, ...followerProviders],
})
export class FollowerModule {}
