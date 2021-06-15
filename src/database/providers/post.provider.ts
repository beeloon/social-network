import { Connection } from 'typeorm';

import { Post } from 'src/database/entities';

import { MONGO_CONNECTION, POST_REPOSITORY } from '../database.constants';

export const postProvider = [
  {
    provide: POST_REPOSITORY,
    useFactory: (connection: Connection) => connection.getRepository(Post),
    inject: [MONGO_CONNECTION],
  },
];
