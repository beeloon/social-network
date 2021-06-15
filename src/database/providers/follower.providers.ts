import { Connection } from 'typeorm';

import { Followers } from 'src/database/entities/followers.entity';

import { FOLLOWER_REPOSITORY, SQL_CONNECTION } from '../database.constants';

export const followerProviders = [
  {
    provide: FOLLOWER_REPOSITORY,
    useFactory: (connection: Connection) => connection.getRepository(Followers),
    inject: [SQL_CONNECTION],
  },
];
