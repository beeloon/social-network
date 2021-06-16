import { Connection } from 'typeorm';

import { User } from 'src/database/entities';

import { REPOSITORY, DATABASE } from '../database.constants';

export const userProvider = [
  {
    provide: REPOSITORY.User,
    useFactory: (connection: Connection) => connection.getRepository(User),
    inject: [DATABASE.Sql],
  },
];
