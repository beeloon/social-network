import { Connection } from 'typeorm';

import { Post } from 'src/database/entities';

import { REPOSITORY, DATABASE } from '../database.constants';

export const postProvider = [
  {
    provide: REPOSITORY.Post,
    useFactory: (connection: Connection) => connection.getRepository(Post),
    inject: [DATABASE.Mongo],
  },
];
