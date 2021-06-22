import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

import { AuthService } from '../auth.service';

import { AuthenticatedUserInfo } from '../interfaces/authenticated-user-info.interface';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(
    username: string,
    password: string,
  ): Promise<AuthenticatedUserInfo> {
    const authenticatedUser = await this.authService.validateUser(
      username,
      password,
    );

    return authenticatedUser;
  }
}