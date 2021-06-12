import { Connection } from 'typeorm';

import { User } from 'src/database/entities';

import { USER_REPOSITORY, SQL_CONNECTION_TOKEN } from '../database.constants';

export const userProviders = [
  {
    provide: USER_REPOSITORY,
    useFactory: (connection: Connection) => connection.getRepository(User),
    inject: [SQL_CONNECTION_TOKEN],
  },
];
