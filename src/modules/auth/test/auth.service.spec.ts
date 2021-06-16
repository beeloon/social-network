import { JwtService } from '@nestjs/jwt';
import { UserService } from '../../user/user.service';
import { AuthService } from '../auth.service';
import { RefreshTokenService } from '../refresh-token.service';

describe('AuthService', () => {
  let authService: AuthService;
  let jwtService: JwtService;
  let userService: UserService;
  let refreshTokenService: RefreshTokenService;

  beforeEach(async () => {
    authService = new AuthService(jwtService, userService, refreshTokenService);
  });

  describe('issueTokenPair', () => {
    it('should return an object with user auth information', async () => {
      return '';
    });
  });
});
