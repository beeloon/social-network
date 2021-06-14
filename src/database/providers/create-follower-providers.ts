import { Connection } from 'typeorm';

import { Followers } from 'src/database/entities/followers';

import { FOLLOWERS_REPOSITORY, SQL_CONNECTION } from '../database.constants';

export const followerProviders = [
  {
    provide: FOLLOWERS_REPOSITORY,
    useFactory: (connection: Connection) => connection.getRepository(Followers),
    inject: [SQL_CONNECTION],
  },
];
