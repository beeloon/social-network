import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Followers } from '../../db/entities/Followers/followers';
import { CreateFollowerDto } from './dto/create-follower-dto';
import { User } from '../../db/entities/Users/user';

@Injectable()
export class FollowerService {
  constructor(
    @InjectRepository(Followers)
    private followersRepository: Repository<Followers>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createFollower: CreateFollowerDto): Promise<Followers | string> {
    const users = await this.usersRepository
      .findByIds([createFollower.followerId, createFollower.targetId])
      .catch((e) => e.message);
    if (!users[0] || !users[1]) {
      return 'No such user';
    }
    return this.followersRepository
      .save(new Followers(users[0], users[1]))
      .catch((e) => e.message);
  }

  async update(
    createFollower: CreateFollowerDto,
    status: string,
  ): Promise<Followers | string> {
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

  async delete(createFollower: CreateFollowerDto): Promise<Followers | string> {
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
    await this.followersRepository
      .delete(followersPair.id)
      .catch((e) => e.message);
    return followersPair;
  }
}
