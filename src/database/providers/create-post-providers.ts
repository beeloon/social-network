import { Connection } from 'typeorm';

import { PostSchema } from 'src/database/entities';

import {
  MONGO_CONNECTION_TOKEN,
  POST_SCHEMA_REPOSITORY,
} from '../database.constants';

export const postSchemaProviders = [
  {
    provide: POST_SCHEMA_REPOSITORY,
    useFactory: (connection: Connection) =>
      connection.getRepository(PostSchema),
    inject: [MONGO_CONNECTION_TOKEN],
  },
];
