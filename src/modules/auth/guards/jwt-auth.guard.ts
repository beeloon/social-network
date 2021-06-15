import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TokenExpiredError } from 'jsonwebtoken';

@Injectable()
export class JWTAuthGuard extends AuthGuard('jwt') {
  handleRequest(err, user, info: Error) {
    if (err || info || !user) {
      throw err || info || new UnauthorizedException();
    }

    return user;
  }
}
