import { JwtService } from '@nestjs/jwt';
import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';

import { UserService } from '../user/user.service';
import { RefreshTokenService } from './refresh-token.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private refreshTokenService: RefreshTokenService,
    private jwtService: JwtService,
  ) {}

  async issueTokenPair(user) {
    const payload = { username: user.name, id: user.id };

    const token = this.jwtService.sign(payload);
    const refreshToken = await this.refreshTokenService.generate(payload.id);

    return {
      token,
      refreshToken,
      tokenType: 'Bearer',
    };
  }

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
    const tokenPair = await this.issueTokenPair(user);

    return tokenPair;
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

  async refresh(user, token: string) {
    const isTokenExist = await this.refreshTokenService.verify(user.id, token);

    if (!isTokenExist) {
      return new UnauthorizedException('Invalid RefreshToken');
    }

    await this.refreshTokenService.delete(user.id);

    const tokenPair = await this.issueTokenPair(user);

    return tokenPair;
  }

  async signup(user) {
    // TODO: CREATE USER WITH USER.SERVICE
  }
}
