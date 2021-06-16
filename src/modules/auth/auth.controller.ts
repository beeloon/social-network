import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import { LocalAuthGuard } from './guards/local-auth.guard';
import { JWTAuthGuard } from './guards/jwt-auth.guard';

import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';

import { RefreshTokenValueDto } from './dto/refresh-token-value.dto';
import { CreateUserDto } from '../user/dto/create-user.dto';

import { TokenPair } from './interfaces/token-pair.interface';
import { AccessToken } from './interfaces/access-token.interface';
import { UserProfileInfo } from './interfaces/user-profile-info.interface';

import { User } from 'src/database/entities';

@Controller()
export class AuthController {
  constructor(
    public authService: AuthService,
    public userService: UserService,
  ) {}

  @UseGuards(JWTAuthGuard)
  @Get('profile')
  getProfile(@Req() req): UserProfileInfo {
    return req.user;
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  login(@Req() req): Promise<TokenPair> {
    return this.authService.login(req.user);
  }

  @Post('auth/signup')
  signup(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @UseGuards(JWTAuthGuard)
  @Post('auth/refresh')
  refresh(
    @Req() req,
    @Body() body: RefreshTokenValueDto,
  ): Promise<TokenPair | AccessToken> {
    return this.authService.refresh(req.user, body.refreshToken);
  }

  @UseGuards(JWTAuthGuard)
  @Delete('auth/logout')
  logout(@Req() req): Promise<HttpStatus> {
    return this.authService.logout(req.user.uid);
  }
}
