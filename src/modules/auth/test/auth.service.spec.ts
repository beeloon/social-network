import { JwtService } from '@nestjs/jwt';
import { UserService } from '../../user/user.service';
import { AuthService } from '../auth.service';
import { RefreshTokenService } from '../refresh-token.service';

const regex = {
  jwt: /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/,
  refresh:
    /[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}/,
};

const userCredentials = {
  email: 'test@mail.com',
  password: '12323434',
};

const userAuthInfo = {
  id: 'fakeid',
  email: 'test@mail.com',
  username: 'bohdan',
};

describe('AuthService', () => {
  let authService: AuthService;
  let jwtService: JwtService;
  let userService: UserService;
  let refreshTokenService: RefreshTokenService;

  beforeEach(async () => {
    authService = new AuthService(jwtService, userService, refreshTokenService);
  });

  describe('Issue token pair', () => {
    it('When information about authenticated user correct, return generated pair of access and refresh tokens', async () => {
      const result = {
        token: expect.stringMatching(regex.jwt),
        refreshToken: expect.stringMatching(regex.refresh),
      };

      jest
        .spyOn(authService, 'issueTokenPair')
        .mockImplementation(() => Promise.resolve(result));

      expect(await authService.issueTokenPair(userAuthInfo)).toBe(result);
    });
  });

  describe('Validate User', () => {
    it('When recieve correct credentials, return information about authenticated user', async () => {
      const { email, password } = userCredentials;

      jest
        .spyOn(authService, 'validateUser')
        .mockImplementation(() => Promise.resolve(userAuthInfo));

      expect(await authService.validateUser(email, password)).toEqual(
        userAuthInfo,
      );
    });

    it('When recieve incorrect credentials, return null', async () => {
      const { email, password } = userCredentials;

      jest
        .spyOn(authService, 'validateUser')
        .mockImplementation(() => Promise.resolve(null));

      expect(await authService.validateUser(email, password)).toEqual(null);
    });
  });
});
