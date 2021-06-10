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

@Controller()
export class AuthController {
  constructor(public authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  login(@Req() req) {
    return this.authService.login(req.user);
  }

  @Post('auth/signup')
  signup(@Body() createUserDto) {
    return this.authService.signup(createUserDto);
  }

  @UseGuards(JWTAuthGuard)
  @Get('profile')
  getProfile(@Req() req) {
    return req.user;
  }

  @UseGuards(JWTAuthGuard)
  @Post('auth/refresh')
  refresh(@Req() req) {
    return this.authService.refresh(req.body.refreshToken);
  }

  @UseGuards(JWTAuthGuard)
  @Delete('auth/logout')
  logout(@Req() req) {
    return this.authService.logout(req.user.uid);
  }
}
