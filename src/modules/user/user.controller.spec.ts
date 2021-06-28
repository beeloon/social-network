import { Test, TestingModule } from '@nestjs/testing';

import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
  let controller: UserController;

  const mockUserService = {
    findAll: jest.fn().mockImplementation(() => {
      return Promise.resolve([]);
    }),
    findByEmail: jest.fn().mockImplementation((email: string) => {

      return Promise.resolve({ id: 'id', username: 'username', email });
    }),
    findById: jest.fn().mockImplementation((id) => {
      return Promise.resolve({ id, username: 'username', email: 'email' });
    }),
    delete: jest.fn().mockImplementation((id) => {
      return Promise.resolve({ result: 'deleted', id });
    }),
    update: jest.fn().mockImplementation((id, dto) => {
      return Promise.resolve({ username: 'username', email: 'email', id });

    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    })
      .overrideProvider(UserService)
      .useValue(mockUserService)
      .compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });


  it('should return all users', async () => {
    expect(await controller.findAll()).toBeInstanceOf(Array);

    expect(mockUserService.findAll).toHaveBeenCalled();
  });


  it('should return a user found by email', async () => {
    const email = 'email';
    expect(await controller.findByEmail(email)).toEqual({
      id: expect.any(String),
      username: expect.any(String),
      email,
    });

    expect(mockUserService.findByEmail).toHaveBeenCalledWith(email);
  });

  it('should return a user found by id', async () => {
    const id = 'id';
    
    expect(await controller.findById(id)).toEqual({
      id,
      username: expect.any(String),
      email: expect.any(String),
    });

    expect(mockUserService.findById).toHaveBeenCalledWith(id);
  });


  it('should delete a user', async () => {
    const id = 'id';

    expect(await controller.delete(id)).toEqual({
      id: expect.any(String),
      result: expect.any(String),
    });

    expect(mockUserService.delete).toHaveBeenCalledWith(id);
  });


  it('should update a user', async () => {
    const dto = {
      username: 'username',
      email: 'email',
    };
    const id = 'id';

    expect(await controller.update(id, dto)).toEqual({
      id: expect.any(String),
      username: expect.any(String),
      email: expect.any(String),
    });

    expect(mockUserService.update).toHaveBeenCalledWith(id, dto);
  });
});

