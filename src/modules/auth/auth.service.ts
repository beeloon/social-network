import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserService } from '../user/user.service';
import { RefreshTokenService } from './refresh-token.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private refreshTokenService: RefreshTokenService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findOne(email);

    // TODO: COMPARE PASSWORD WITH BCRYPT
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async login(user: any) {
    const payload = { username: user.name, uid: user.id };

    const token = this.jwtService.sign(payload);
    const refreshToken = await this.refreshTokenService.create(user.id, 30);

    return {
      token,
      refreshToken,
      token_type: 'Bearer',
    };
  }

  async signup(user) {
    // TODO: CREATE USER WITH USER.SERVICE
  }

  async logout(userId) {
    const { affected: isTokensDeleted } = await this.refreshTokenService.delete(
      userId,
    );

    if (isTokensDeleted) {
      return HttpStatus.OK;
    }

    return HttpStatus.NO_CONTENT;
  }

  async refresh(token: string) {
    return this.refreshTokenService.verify(token);
  }
}
