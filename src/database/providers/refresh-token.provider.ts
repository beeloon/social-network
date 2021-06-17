import { Connection } from 'typeorm';

import { RefreshToken } from 'src/database/entities';

import { REPOSITORY, DATABASE } from '../database.constants';

export const refreshTokenProvider = [
  {
    provide: REPOSITORY.RefreshToken,
    useFactory: (connection: Connection) =>
      connection.getRepository(RefreshToken),
    inject: [DATABASE.Sql],
  },
];
