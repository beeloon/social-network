export const mockUserPayload = {
  id: 1,
  uid: 'user1',
  email: 'test@mail.com',
  iat: 111,
  exp: 112,
};

export const mockJwtService = {
  sign: jest.fn(() => 'fakejwttoken'),
  verifyAsync: jest.fn((token) => {
    if (token === 'valid') return Promise.resolve(mockUserPayload);
    throw Error();
  }),
};

export const mockConfigService = {
  get: jest.fn((string) => string),
};

export const mockTokenRepository = {
  save: jest.fn(({ user_id, value }) =>
    Promise.resolve({ id: 2, user_id, value }),
  ),
  findOne: jest.fn(({ user_id }) =>
    user_id === 'user1'
      ? Promise.resolve({ id: 1, user_id: 'user1', value: 'token1' })
      : Promise.resolve(undefined),
  ),
  delete: jest.fn(({ value }) =>
    value === 'exist'
      ? Promise.resolve({ affected: 2 })
      : Promise.resolve({ affected: 0 }),
  ),
};
