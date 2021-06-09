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
  async login(@Req() req) {
    return this.authService.login(req.user);
  }

  @Post('auth/signup')
  async signup(@Body() createUserDto) {
    return this.authService.signup(createUserDto);
  }

  @UseGuards(JWTAuthGuard)
  @Get('profile')
  getProfile(@Req() req) {
    return req.user;
  }

  @UseGuards(JWTAuthGuard)
  @Post('auth/refresh')
  refreshToken(@Body() body) {
    return this.authService.refresh(body.refreshToken);
  }
}
