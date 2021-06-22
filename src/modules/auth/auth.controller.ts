import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';

import { LocalAuthGuard } from './guards/local-auth.guard';
import { JWTAuthGuard } from './guards/jwt-auth.guard';

import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';

import { CreateUserDto } from '../user/dto/create-user.dto';

import { TokenPair } from './interfaces/token-pair.interface';
import { AccessToken } from './interfaces/access-token.interface';
import { AuthenticatedUserInfo } from './interfaces/authenticated-user-info.interface';

@Controller()
export class AuthController {
  constructor(
    public authService: AuthService,
    public userService: UserService,
  ) {}

  private setCookie(res: Response, tokens: TokenPair): void {
    res.cookie('refreshToken', tokens.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
  }

  @UseGuards(JWTAuthGuard)
  @Get('profile')
  getProfile(@Req() req): AuthenticatedUserInfo {
    return req.user;
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(
    @Req() req,
    @Res({ passthrough: true }) res: Response,
  ): Promise<TokenPair> {
    const tokenPair = await this.authService.login(req.user);
    this.setCookie(res, tokenPair);

    return tokenPair;
  }

  @Post('auth/signup')
  async signup(
    @Body() createUserDto: CreateUserDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<TokenPair> {
    const tokenPair = await this.authService.signup(createUserDto);
    this.setCookie(res, tokenPair);

    return tokenPair;
  }

  @UseGuards(JWTAuthGuard)
  @Get('auth/refresh')
  async refresh(
    @Req() req,
    @Res({ passthrough: true }) res: Response,
  ): Promise<TokenPair | AccessToken> {
    const { refreshToken } = req.cookies;
    const refreshResult = await this.authService.refresh(refreshToken);
    this.setCookie(res, refreshResult);

    return refreshResult;
  }

  @UseGuards(JWTAuthGuard)
  @Delete('auth/logout')
  async logout(
    @Req() req,
    @Res({ passthrough: true }) res: Response,
  ): Promise<HttpStatus> {
    const { refreshToken } = req.cookies;
    const deletedTokenStatus = await this.authService.logout(refreshToken);

    res.clearCookie('refreshToken');

    return deletedTokenStatus;
  }
}
