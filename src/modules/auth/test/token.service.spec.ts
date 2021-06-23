import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';

import { TokenService } from '../token.service';
import { REPOSITORY } from '../../../database/database.constants';

export const mockToken = {
  id: 'a2634196-dc1e-4ca8-9b45-131a5d8a83d9',
  value: '399844eb-c773-4c59-a69f-3a4c7892f141',
  user_id: '799ae53f-c924-4c87-a852-63ded876450d',
};

const mockJwtServiceMock = {
  sign: jest.fn().mockImplementation(() => true),
  verify: jest.fn().mockImplementation(() => true),
};

const mockTokenRepository = {
  save: jest.fn().mockImplementation(() => Promise.resolve(mockToken)),
  findOne: jest.fn().mockImplementation((id) => Promise.resolve(mockToken)),
  delete: jest.fn().mockImplementation((id) => Promise.resolve(true)),
};

describe('TokenService', () => {
  let tokenService: TokenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TokenService,
        ConfigService,
        { provide: REPOSITORY.RefreshToken, useValue: mockTokenRepository },
      ],
    }).compile();

    tokenService = module.get<TokenService>(TokenService);
  });

  describe('Generate Tokens', () => {
    it('When receive correct user payload, return generated refresh and access tokens pair and save refresh token to DB', async () => {
      return '';
    });
  });

  describe('Find', () => {
    it('When token exist in DB, return token', async () => {
      return '';
    });

    it(`When token doesn't exist in DB, return undefined`, async () => {
      return '';
    });
  });

  describe('Save', () => {
    it('When token already exist in DB, return this token', async () => {
      return '';
    });

    it(`When token doesn't exist in DB, save token to DB and return saved token`, async () => {
      return '';
    });
  });

  describe('Remove', () => {
    it('When amount of affected columns in DB after delete greather than 0, return true', async () => {
      return '';
    });

    it('When amount of affected columns in DB after delete is 0, return false', async () => {
      return '';
    });
  });

  describe('Validate', () => {
    it('When correct signature and valid secret, return user info payload', async () => {
      return '';
    });

    it('When incorrect signature or invalid secret, return user unauthorized error', async () => {
      return '';
    });
  });
});
