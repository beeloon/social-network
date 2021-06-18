export const mockToken = {
  id: 'a2634196-dc1e-4ca8-9b45-131a5d8a83d9',
  value: '399844eb-c773-4c59-a69f-3a4c7892f141',
  hash: '$2b$10$getRdv1IPyrbydE7hBuQjuXKl5sJ8uD3ITEAeZk50X4Um4ax1oP/2',
  user_id: '799ae53f-c924-4c87-a852-63ded876450d',
  expires: new Date(),
};

export const mockUserId = mockToken.user_id;
export const mockTokenValue = mockToken.value;

export const mockRefreshTokenRepository = {
  save: jest.fn().mockImplementation(() => Promise.resolve(mockToken)),
  findOne: jest.fn().mockImplementation((id) => Promise.resolve(mockToken)),
  delete: jest.fn().mockImplementation((id) => Promise.resolve(true)),
};
