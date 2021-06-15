import {
  Body,
  Controller,
  Delete,
  Get,
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

@Controller()
export class AuthController {
  constructor(
    public authService: AuthService,
    public userService: UserService,
  ) {}

  @UseGuards(JWTAuthGuard)
  @Get('profile')
  getProfile(@Req() req) {
    return req.user;
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  login(@Req() req) {
    return this.authService.login(req.user);
  }

  @Post('auth/signup')
  signup(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @UseGuards(JWTAuthGuard)
  @Post('auth/refresh')
  refresh(@Req() req, @Body() body: RefreshTokenValueDto) {
    return this.authService.refresh(req.user, body.refreshToken);
  }

  @UseGuards(JWTAuthGuard)
  @Delete('auth/logout')
  logout(@Req() req) {
    return this.authService.logout(req.user.uid);
  }
}
