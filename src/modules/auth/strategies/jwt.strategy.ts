import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { User } from 'src/database/entities';

import { AuthenticatedUserInfo } from '../interfaces/authenticated-user-info.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('tokens.access.secret'),
    });
  }

  async validate(payload: User): Promise<AuthenticatedUserInfo> {
    return {
      id: payload.id,
      username: payload.username,
      email: payload.email,
    };
  }
}
