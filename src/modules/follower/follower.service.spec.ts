import { Test, TestingModule } from '@nestjs/testing';
import { FollowerService } from './follower.service';
import { REPOSITORY } from '../../database/database.constants';

describe('FollowerService', () => {
  let service: FollowerService;

  const mockFollowerRepository = {
    save: jest.fn().mockImplementation((followers) =>
      Promise.resolve({
        id: Date.now(),
        status: 'Pending',
        ...followers,
      }),
    ),
    findOne: jest.fn().mockImplementation((option) => {
      return Promise.resolve({
        id: Date.now(),
        status: 'Accepted',
        followerId: option.where.followerId,
        targetId: option.where.targetId,
      });
    }),
    update: jest.fn().mockImplementation((followersPair) => {
      return Promise.resolve({
        id: followersPair,
        status: 'Accepted',
      });
    }),
    delete: jest.fn().mockImplementation((id) => Promise.resolve()),
  };

  const mockUserRepository = {
    findByIds: jest.fn().mockImplementation(([followerId, targetId]) => {
      return Promise.resolve([followerId, targetId]);
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FollowerService,
        {
          provide: REPOSITORY.Follwer,
          useValue: mockFollowerRepository,
        },
        {
          provide: REPOSITORY.User,
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<FollowerService>(FollowerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new follower record and return that', async () => {
    const dto = {
      followerId: '8cec14e2-ff7b-4aee-bfb5-b0d862917537',
      targetId: '96f9f1ed-63a2-489d-90ee-37f376b99f51',
    };
    expect(await service.create(dto)).toEqual({
      id: expect.any(Number),
      status: 'Pending',
      ...dto,
    });
  });

  it('should update a follower with status "Accepted" and return that', async () => {
    const dto = {
      followerId: '8cec14e2-ff7b-4aee-bfb5-b0d862917537',
      targetId: '96f9f1ed-63a2-489d-90ee-37f376b99f51',
    };
    expect(await service.update(dto, 'Accepted')).toEqual({
      id: expect.any(Number),
      status: 'Accepted',
      ...dto,
    });
  });

  it('should remove a follower and return that', async () => {
    const dto = {
      followerId: '8cec14e2-ff7b-4aee-bfb5-b0d862917537',
      targetId: '96f9f1ed-63a2-489d-90ee-37f376b99f51',
    };
    expect(await service.delete(dto)).toEqual({
      id: expect.any(Number),
      status: 'Accepted',
      followerId: dto.followerId,
      targetId: dto.targetId,
    });
  });
});
