import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';

import { RefreshTokenService } from '../refresh-token.service';
import { REPOSITORY } from '../../../database/database.constants';

import {
  mockToken,
  mockUserId,
  mockTokenValue,
  mockRefreshTokenRepository,
} from './mock/refresh-token.mock';

describe('RefreshTokenService', () => {
  let tokenService: RefreshTokenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RefreshTokenService,
        ConfigService,
        {
          provide: REPOSITORY.RefreshToken,
          useValue: mockRefreshTokenRepository,
        },
      ],
    }).compile();

    tokenService = module.get<RefreshTokenService>(RefreshTokenService);
  });

  describe('Create', () => {
    it('When recieve correct user id, return token value that was generated with uuid', async () => {
      expect(await tokenService.create(mockUserId)).toEqual(mockToken);
    });
  });

  describe('Delete', () => {
    it('When the user ID of the existing token comes, return true', async () => {
      await expect(tokenService.delete(mockUserId)).toBeTruthy();
    });
  });

  describe('Generate', () => {
    it('When the user ID of the existing token comes, return existing token value', async () => {
      expect(await tokenService.generate(mockUserId)).toBe(mockTokenValue);
    });
  });

  describe('Is expired', () => {
    it('When token date is greather than current date, return false', async () => {
      const tommorow = new Date();
      tommorow.setDate(tommorow.getDate() + 1);
      const futureTokenMock = { ...mockToken, expires: tommorow };

      expect(tokenService.isExpired(futureTokenMock)).toBeFalsy();
    });
    it('When token date is equal to current date, return true', async () => {
      expect(tokenService.isExpired(mockToken)).toBeTruthy();
    });
    it('When token date is less than current date, return true', async () => {
      expect(tokenService.isExpired(mockToken)).toBeTruthy();
    });
  });

  describe('Is valid', () => {
    it('When the user ID of the existing token comes, return existing token value', async () => {
      expect(tokenService.isValid(mockTokenValue, mockToken)).toBeTruthy();
    });
  });

  describe('Verify', () => {
    it('When the user ID from existing token and existing token value comes, return existing token', async () => {
      expect(await tokenService.verify(mockUserId, mockTokenValue)).toBe(
        mockToken,
      );
    });
  });
});
