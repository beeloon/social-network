import { ConfigService } from '@nestjs/config';
import { createConnection } from 'typeorm';

import { MONGO_CONNECTION, SQL_CONNECTION } from './database.constants';

import { User, Post, Follower, RefreshToken } from 'src/database/entities';

export const databaseProviders = [
  {
    provide: SQL_CONNECTION,
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) =>
      await createConnection({
        type: configService.get('sql.connectionOptions.type'),
        host: configService.get('sql.connectionOptions.host'),
        port: configService.get('sql.connectionOptions.port'),
        username: configService.get('sql.connectionOptions.username'),
        password: configService.get('sql.connectionOptions.password'),
        database: configService.get('sql.connectionOptions.database'),
        entities: [User, Follower, RefreshToken],
        synchronize: true,
      }),
  },

  {
    provide: MONGO_CONNECTION,
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) =>
      await createConnection({
        type: configService.get('mongo.connectionOptions.type'),
        url: configService.get('mongo.connectionOptions.uri'),
        useUnifiedTopology: true,
        useNewUrlParser: true,
        synchronize: true,
        entities: [Post],
      }),
  },
];
