import { Test, TestingModule } from '@nestjs/testing';

import { PostService } from './post.service';
import { REPOSITORY } from '../../database/database.constants';
describe('PostService', () => {
  let service: PostService;

  const mockPostRepository = {
    find: jest.fn().mockImplementation(() => {
      return Promise.resolve(['post1', 'post2']);
    }),
    findOne: jest.fn().mockImplementation(() => {
      return Promise.resolve({
        id: 'id',
        title: 'email',
        text: 'username',
        ownerId: 'ownerId',
      });
    }),
    remove: jest.fn().mockImplementation((id) => {
      return Promise.resolve({ result: 'deleted', id });
    }),
    update: jest.fn().mockImplementation((id, dto) => {
      return Promise.resolve({
        id: id.id,
        title: 'email',
        text: 'username',
        ...dto,
      });
    }),
  };

  const mockUserRepository = {
    findOne: jest.fn().mockImplementation((params) => {
      return Promise.resolve({
        id: 'id',
        email: 'email',
        username: 'username',
        ...params.where,
      });
    }),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostService,
        {
          provide: REPOSITORY.Post,
          useValue: mockPostRepository,
        },
        {
          provide: REPOSITORY.User,
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<PostService>(PostService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find all posts', async () => {
    expect(await service.getAllPosts()).toBeInstanceOf(Array);
  });

  it('should find post by id', async () => {
    const id = 'id';
    expect(await service.getSinglePost(id)).toEqual({
      id,
      title: expect.any(String),
      text: expect.any(String),
      ownerId: expect.any(String),
    });
  });

  it('should delete a post', async () => {
    const id = 'id';
    expect(await service.deletePost(id)).toEqual(id);
  });

  it('should update a post', async () => {
    const id = 'id';
    const dto = {
      title: 'title',
      text: 'text',
    };
    expect(await service.updatePost(id, dto)).toEqual({
      id: expect.any(String),
      title: 'title',
      text: 'text',
      ...dto,
    });
  });
});
