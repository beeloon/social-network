import { Test, TestingModule } from '@nestjs/testing';

import { UsersService } from './user.service';

describe('UserService', () => {
  let provider: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    provider = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
