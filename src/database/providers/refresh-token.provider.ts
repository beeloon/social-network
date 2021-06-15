import { Connection } from 'typeorm';

import { RefreshToken } from 'src/database/entities';

import {
  REFRESH_TOKEN_REPOSITORY,
  SQL_CONNECTION,
} from '../database.constants';

export const refreshTokenProvider = [
  {
    provide: REFRESH_TOKEN_REPOSITORY,
    useFactory: (connection: Connection) =>
      connection.getRepository(RefreshToken),
    inject: [SQL_CONNECTION],
  },
];
