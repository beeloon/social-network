import { JwtService } from '@nestjs/jwt';
import { HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { UserService } from '../user/user.service';
import { RefreshTokenService } from './refresh-token.service';

import { TokenPair } from './interfaces/token-pair.interface';
import { AccessToken } from './interfaces/access-token.interface';

import { User } from 'src/database/entities';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    private refreshTokenService: RefreshTokenService,
  ) {}

  async issueTokenPair(user: User): Promise<TokenPair> {
    const payload = { username: user.username, id: user.id };

    const token = this.jwtService.sign(payload);
    const refreshToken = await this.refreshTokenService.generate(payload.id);

    return {
      token,
      refreshToken,
      tokenType: 'Bearer',
    };
  }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findByEmail(email);

    if (user && bcrypt.compare(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async login(user: User): Promise<TokenPair> {
    const tokenPair = await this.issueTokenPair(user);

    return tokenPair;
  }

  async logout(userId: string): Promise<HttpStatus> {
    const { affected: isTokensDeleted } = await this.refreshTokenService.delete(
      userId,
    );

    if (isTokensDeleted) {
      return HttpStatus.OK;
    }

    return HttpStatus.NO_CONTENT;
  }

  async refresh(user: User, token: string): Promise<TokenPair | AccessToken> {
    const dbToken = await this.refreshTokenService.verify(user.id, token);

    if (this.refreshTokenService.isExpired(dbToken)) {
      await this.refreshTokenService.delete(user.id);
      const tokenPair = await this.issueTokenPair(user);

      return tokenPair;
    }

    return {
      token: this.jwtService.sign({ username: user.username, id: user.id }),
    };
  }
}
