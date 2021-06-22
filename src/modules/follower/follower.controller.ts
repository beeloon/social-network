import {
  Controller,
  Post,
  Body,
  Delete,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { FollowerService } from './follower.service';
import { CreateFollowerDto } from './dto/create-follower.dto';
import { Follower } from 'src/database/entities';

import { JWTAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JWTAuthGuard)
@Controller('followers')
export class FollowerController {
  constructor(private readonly followerService: FollowerService) {}

  @Post('follow')
  create(
    @Body() createFollowerDto: CreateFollowerDto,
  ): Promise<Follower | string> {
    return this.followerService.create(createFollowerDto);
  }

  @Patch('accept')
  accept(
    @Body() createFollowerDto: CreateFollowerDto,
  ): Promise<Follower | string> {
    return this.followerService.update(createFollowerDto, 'Accepted');
  }

  @Patch('decline')
  decline(
    @Body() createFollowerDto: CreateFollowerDto,
  ): Promise<Follower | string> {
    return this.followerService.update(createFollowerDto, 'Declined');
  }

  @Delete('unfollow')
  delete(
    @Body() createFollowerDto: CreateFollowerDto,
  ): Promise<Follower | string> {
    return this.followerService.delete(createFollowerDto);
  }
}
