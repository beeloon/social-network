import { mockUserPayload } from './token.service';

const mockUser = {
  id: 'user1',
  username: 'testuser',
  email: 'test@mail.com',
  password: '$2y$10$JXvPXgaz1fdQv.6LnnlWCeIXUplHy4csWS3UzjE.LD8ltj8p.7f6q',
  updated_at: Date.now(),
  created_at: Date.now(),
};

export const mockTokenService = {
  find: jest.fn(({ value }) =>
    value === 'token1'
      ? Promise.resolve({ id: 1, user_id: 'user1', value: 'token1' })
      : Promise.resolve(undefined),
  ),
  validate: jest.fn(() => Promise.resolve(mockUserPayload)),
  generateTokens: jest.fn(() => Promise.resolve(false)),
};

export const mockUserService = {
  findById: jest.fn(() => Promise.resolve(mockUser)),
  findByEmail: jest.fn(() => Promise.resolve(mockUser)),
};
