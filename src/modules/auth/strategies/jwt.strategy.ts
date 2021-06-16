import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AuthenticatedUserInfo } from '../interfaces/authenticated-user-info.interface';
import { UserProfileInfo } from '../interfaces/user-profile-info.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('token.secret'),
    });
  }

  async validate(payload: AuthenticatedUserInfo): Promise<UserProfileInfo> {
    return { id: payload.id, username: payload.username };
  }
}
