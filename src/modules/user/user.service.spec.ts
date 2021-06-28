import { Test, TestingModule } from '@nestjs/testing';

import { UserService } from './user.service';
import { REPOSITORY } from '../../database/database.constants';

describe('UserService', () => {
  let service: UserService;

  const mockUserRepository = {
    find: jest.fn().mockImplementation(() => {
      return Promise.resolve(['user1', 'user2']);
    }),
    findOne: jest.fn().mockImplementation((params) => {
      return Promise.resolve({
        id: 'id',
        email: 'email',
        username: 'username',
        ...params.where,
      });
    }),
    delete: jest.fn().mockImplementation((id) => {
      return Promise.resolve({ result: 'deleted', id });
    }),
    update: jest.fn().mockImplementation((id, dto) => {
      return Promise.resolve({
        id,
        username: 'username',
        email: 'email',
        ...dto,
      });

    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: REPOSITORY.User,
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find all users', async () => {
    expect(await service.findAll()).toBeInstanceOf(Array);
  });

  it('should find user by email', async () => {
    const email = 'email';
    expect(await service.findByEmail(email)).toEqual({
      id: expect.any(String),
      email,
      username: expect.any(String),
    });
  });

  it('should find user by id', async () => {
    const id = 'id';
    expect(await service.findById(id)).toEqual({
      id,
      email: expect.any(String),
      username: expect.any(String),
    });
  });

  it('should delete a user', async () => {
    const id = 'id';
    expect(await service.delete(id)).toEqual({
      id,
      result: 'deleted',
    });
  });

  it('should update a user', async () => {
    const id = 'id';
    const dto = {
      username: 'username',
      email: 'email',
    };
    expect(await service.update(id, dto)).toEqual({
      id: expect.any(String),
      username: 'username',
      email: 'email',
      ...dto,
    });
  });
});

