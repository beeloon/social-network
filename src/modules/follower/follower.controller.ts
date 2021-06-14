import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { FollowerService } from './follower.service';
import { CreateFollowerDto } from './dto/create-follower-dto';
import { Followers } from '../../database/entities/followers';

@Controller('followers')
export class FollowerController {
  constructor(private readonly followerService: FollowerService) {}

  @Post('follow')
  create(
    @Body() createFollowerDto: CreateFollowerDto,
  ): Promise<Followers | string> {
    return this.followerService.create(createFollowerDto);
  }

  @Patch('accept')
  accept(
    @Body() createFollowerDto: CreateFollowerDto,
  ): Promise<Followers | string> {
    return this.followerService.update(createFollowerDto, 'Accepted');
  }

  @Patch('decline')
  decline(
    @Body() createFollowerDto: CreateFollowerDto,
  ): Promise<Followers | string> {
    return this.followerService.update(createFollowerDto, 'Declined');
  }

  @Delete('unfollow')
  delete(
    @Body() createFollowerDto: CreateFollowerDto,
  ): Promise<Followers | string> {
    return this.followerService.delete(createFollowerDto);
  }
}
