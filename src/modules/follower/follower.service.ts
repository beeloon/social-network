import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Follower } from 'src/database/entities';
import { CreateFollowerDto } from './dto/create-follower.dto';
import { User } from 'src/database/entities';
import {
  FOLLOWER_REPOSITORY,
  USER_REPOSITORY,
} from 'src/database/database.constants';

@Injectable()
export class FollowerService {
  constructor(
    @Inject(FOLLOWER_REPOSITORY)
    private followersRepository: Repository<Follower>,
    @Inject(USER_REPOSITORY)
    private usersRepository: Repository<User>,
  ) {}

  async create(createFollower: CreateFollowerDto): Promise<Follower | string> {
    const users = await this.usersRepository
      .findByIds([createFollower.followerId, createFollower.targetId])
      .catch((e) => e.message);
    if (!users[0] || !users[1]) {
      return 'No such user';
    }
    return this.followersRepository
      .save(new Follower(users[0], users[1]))
      .catch((e) => e.message);
  }

  async update(
    createFollower: CreateFollowerDto,
    status: string,
  ): Promise<Follower | string> {
    const users = await this.usersRepository
      .findByIds([createFollower.targetId, createFollower.followerId])
      .catch((e) => e.message);
    if (!users[0] || !users[1]) {
      return 'No such user';
    }
    const followersPair = await this.followersRepository
      .findOne({
        where: {
          targetId: createFollower.targetId,
          followerId: createFollower.followerId,
        },
      })
      .catch((e) => e.message);
    if (!followersPair) {
      return "User didn't send an invitation to become a follower";
    }
    await this.followersRepository
      .update(followersPair.id, {
        status: status,
      })
      .catch((e) => e.message);
    return this.followersRepository.findOne({
      where: {
        targetId: createFollower.targetId,
        followerId: createFollower.followerId,
      },
    });
  }

  async delete(createFollower: CreateFollowerDto): Promise<Follower | string> {
    const followersPair = await this.followersRepository
      .findOne({
        where: {
          targetId: createFollower.targetId,
          followerId: createFollower.followerId,
        },
      })
      .catch((e) => e.message);
    if (!followersPair) {
      return 'No such followers pair';
    }
    if (followersPair.status === 'Declined') {
      return "You're not following this person";
    }
    await this.followersRepository
      .delete(followersPair.id)
      .catch((e) => e.message);
    return followersPair;
  }
}
