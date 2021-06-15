import { Connection } from 'typeorm';

import { User } from 'src/database/entities';

import { USER_REPOSITORY, SQL_CONNECTION } from '../database.constants';

export const userProvider = [
  {
    provide: USER_REPOSITORY,
    useFactory: (connection: Connection) => connection.getRepository(User),
    inject: [SQL_CONNECTION],
  },
];
