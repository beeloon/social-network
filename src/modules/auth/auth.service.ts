import { JwtService } from '@nestjs/jwt';
import { HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { UserService } from '../user/user.service';
import { RefreshTokenService } from './refresh-token.service';

import { TokenPair } from './interfaces/token-pair.interface';
import { AccessToken } from './interfaces/access-token.interface';
import { AuthenticatedUserInfo } from './interfaces/authenticated-user-info.interface';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    private refreshTokenService: RefreshTokenService,
  ) {}

  async issueTokenPair(user: AuthenticatedUserInfo): Promise<TokenPair> {
    const payload = { username: user.username, id: user.id };

    const token = this.jwtService.sign(payload);
    const refreshToken = await this.refreshTokenService.generate(payload.id);

    return { token, refreshToken };
  }

  async validateUser(
    email: string,
    pass: string,
  ): Promise<AuthenticatedUserInfo | null> {
    const user = await this.userService.findByEmail(email);

    if (user && bcrypt.compare(pass, user.password)) {
      const { id, username, email } = user;
      const authenticatedUserInfo = { id, username, email };

      return authenticatedUserInfo;
    }

    return null;
  }

  async login(user: AuthenticatedUserInfo): Promise<TokenPair> {
    const tokenPair = await this.issueTokenPair(user);

    return tokenPair;
  }

  async logout(userId: string): Promise<HttpStatus> {
    const isTokensDeleted = await this.refreshTokenService.delete(userId);

    return isTokensDeleted ? HttpStatus.OK : HttpStatus.NO_CONTENT;
  }

  async refresh(
    userInfo: AuthenticatedUserInfo,
    token: string,
  ): Promise<TokenPair | AccessToken> {
    const dbToken = await this.refreshTokenService.verify(userInfo.id, token);

    if (this.refreshTokenService.isExpired(dbToken)) {
      await this.refreshTokenService.delete(userInfo.id);
      const tokenPair = await this.issueTokenPair(userInfo);

      return tokenPair;
    }

    return {
      token: this.jwtService.sign({
        username: userInfo.username,
        id: userInfo.id,
      }),
    };
  }
}
