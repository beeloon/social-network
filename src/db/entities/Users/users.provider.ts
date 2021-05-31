import { User } from './user';

export const userProvider = [
  {
    provide: 'USERS_REPOSITORY',
    useValue: User,
  },
];
