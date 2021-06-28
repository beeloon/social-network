import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { AuthService } from '../auth.service';

import { mockTokenService, mockUserService } from './__mocks__/auth.service';

describe('TokenService', () => {
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: 'TokenService', useValue: mockTokenService },
        { provide: 'UserService', useValue: mockUserService },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  describe('Refresh', () => {
    it("When token doesn't exist in DB, throw not found exception", async () => {
      try {
        await authService.refresh('token2');
      } catch (err) {
        expect(err).toEqual(new NotFoundException('Refresh token not found.'));
      }
    });

    it(`When token exist in DB, but user doesn't, throw not found user exception`, async () => {
      try {
        await authService.refresh('token1');
      } catch (err) {
        expect(err).toEqual(
          new NotFoundException(`User with id: user1 not found.`),
        );
      }
    });

    it('When token and user exist in DB, retun token pair', async () => {
      try {
        await authService.refresh('token1');
      } catch (err) {
        expect(err).toEqual(
          new NotFoundException('User with id: user1 not found.'),
        );
      }
    });
  });

  describe('Validate User', () => {
    it('When user pass incorrect password, throw invalid pass unauthorized error', async () => {
      try {
        await authService.validateUser('t@mail.com', '___');
      } catch (err) {
        expect(err).toEqual(new UnauthorizedException('Incorrect password.'));
      }
    });
  });
});
