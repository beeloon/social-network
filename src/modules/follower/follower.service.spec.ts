import { Test, TestingModule } from '@nestjs/testing';

import { FollowerService } from './follower.service';

describe('FollowerService', () => {
  let provider: FollowerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FollowerService],
    }).compile();

    provider = module.get<FollowerService>(FollowerService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
