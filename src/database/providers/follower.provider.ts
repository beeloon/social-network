import { Connection } from 'typeorm';

import { Follower } from 'src/database/entities/follower.entity';

import { REPOSITORY, DATABASE } from '../database.constants';

export const followerProvider = [
  {
    provide: REPOSITORY.Follower,
    useFactory: (connection: Connection) => connection.getRepository(Follower),
    inject: [DATABASE.Sql],
  },
];
