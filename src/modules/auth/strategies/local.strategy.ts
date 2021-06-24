import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { AuthService } from '../auth.service';

import { UserPayload } from '../auth.interface';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(username: string, password: string): Promise<UserPayload> {
    const authenticatedUser = await this.authService.validateUser(
      username,
      password,
    );

    return authenticatedUser;
  }
}
