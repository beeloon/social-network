import { User } from './user';

export const usersProviders = [
  {
    provide: 'USERS_REPOSITORY',
    useValue: User,
  },
];
