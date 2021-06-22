import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JWTAuthGuard extends AuthGuard('jwt') {
  handleRequest(err, user) {
    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
