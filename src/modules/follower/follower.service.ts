import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Followers } from '../../db/entities/Followers/followers';
import { CreateFollowerDto } from './dto/create-follower-dto';

@Injectable()
export class FollowerService {
  constructor(
    @InjectRepository(Followers)
    private followersRepository: Repository<Followers>,
  ) {}

  async create(createFollower: CreateFollowerDto) {
    return this.followersRepository
      .save(new Followers(createFollower))
      .catch((e) => e.message);
  }
}
