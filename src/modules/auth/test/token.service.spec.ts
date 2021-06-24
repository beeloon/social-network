import { Test, TestingModule } from '@nestjs/testing';

import { TokenService } from '../token.service';
import { REPOSITORY } from '../../../database/database.constants';
import { UnauthorizedException } from '@nestjs/common';

import {
  mockJwtService,
  mockConfigService,
  mockTokenRepository,
  mockUserPayload,
} from './__mocks__/token.service';

describe('TokenService', () => {
  let tokenService: TokenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TokenService,
        { provide: 'JwtService', useValue: mockJwtService },
        { provide: 'ConfigService', useValue: mockConfigService },
        { provide: REPOSITORY.RefreshToken, useValue: mockTokenRepository },
      ],
    }).compile();

    tokenService = module.get<TokenService>(TokenService);
  });

  describe('Generate Tokens', () => {
    it('When receive correct user payload, return generated refresh and access tokens pair and save refresh token to DB', async () => {
      const res = await tokenService.generateTokens({
        id: '1',
        username: 'test',
        email: 'test@mail.com',
      });
      expect(res).toEqual({
        accessToken: 'fakejwttoken',
        refreshToken: 'fakejwttoken',
      });
    });
  });

  describe('Find', () => {
    it('When token exist in DB, return DB token', async () => {
      const existedToken = { id: 1, user_id: 'user1', value: 'token1' };

      expect(await tokenService.find({ user_id: 'user1' })).toEqual(
        existedToken,
      );
    });

    it(`When token doesn't exist in DB, return undefined`, async () => {
      expect(await tokenService.find({ user_id: 'user2' })).toEqual(undefined);
    });
  });

  describe('Save', () => {
    it('When token already exist in DB, return DB token', async () => {
      const existedToken = { id: 1, user_id: 'user1', value: 'token1' };

      expect(await tokenService.save('user1', '_')).toEqual(existedToken);
    });

    it(`When token doesn't exist in DB, save token to DB and return saved token`, async () => {
      const newToken = { id: 2, user_id: 'user2', value: 'token2' };

      expect(await tokenService.save('user2', 'token2')).toEqual(newToken);
    });
  });

  describe('Remove', () => {
    it('When amount of affected columns in DB after delete greather than 0, return true', async () => {
      expect(await tokenService.remove('exist')).toBeTruthy();
    });

    it('When amount of affected columns in DB after delete is 0, return false', async () => {
      expect(await tokenService.remove('nonexistent')).toBeFalsy();
    });
  });

  describe('Validate', () => {
    it('When correct signature and valid secret, return user info payload', async () => {
      expect(await tokenService.validate('valid')).toEqual(mockUserPayload);
    });

    it('When incorrect signature or invalid secret, return user unauthorized error', async () => {
      try {
        await tokenService.validate('nonvalid');
      } catch (err) {
        expect(err).toEqual(new UnauthorizedException(err.message));
      }
    });
  });
});
