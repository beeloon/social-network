import { Connection } from 'typeorm';

import { User } from '../entities/user.entity';

import { USER_REPOSITORY, SQL_CONNECTION } from '../database.constants';

export const userProviders = [
  {
    provide: USER_REPOSITORY,
    useFactory: (connection: Connection) => connection.getRepository(User),
    inject: [SQL_CONNECTION],
  },
];
