import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../../user/user.service';
import { AuthService } from '../auth.service';
import { TokenService } from '../token.service';

const mockUserCredentials = {
  email: 'test@mail.com',
  password: '12323434',
};

const mockUserPayload = {
  id: '12345678',
  email: 'test@mail.com',
  username: 'bohdan',
};

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, TokenService],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  describe('Generate Payload', () => {
    it('When recieve user entity, return payload info', async () => {
      return '';
    });
  });

  describe('Issue Token Pair', () => {
    it('When recieve user entiry or payload, return generated token pair', async () => {
      return '';
    });
  });

  describe('Login', () => {
    it('', async () => {
      return '';
    });
  });

  describe('Logout', () => {
    it('When token in DB, return http status ok', async () => {
      return '';
    });

    it(`When doesn't exist in DB, return http status no content`, async () => {
      return '';
    });
  });

  describe('Refresh', () => {
    it('', async () => {
      return '';
    });
  });

  describe('Signup', () => {
    it('', async () => {
      return '';
    });
  });

  describe('Validate User', () => {
    it('When receive incorrect email, throw incorrect email authorization exception', async () => {
      return '';
    });

    it('When receive incorrect password, throw incorrect pass authorization exception', async () => {
      return '';
    });

    it('When receive correct credentials, return user payload', async () => {
      return '';
    });
  });
});
