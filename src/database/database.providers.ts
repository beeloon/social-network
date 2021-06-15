import { ConfigService } from '@nestjs/config';
import { createConnection } from 'typeorm';

import {
  MONGO_CONNECTION_TOKEN,
  SQL_CONNECTION_TOKEN,
} from './database.constants';

import { PostSchema, RefreshToken, User, Followers } from 'src/database/entities';

export const databaseProviders = [
  {
    provide: SQL_CONNECTION_TOKEN,
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) =>
      await createConnection({
        type: configService.get('sql.connectionOptions.type'),
        host: configService.get('sql.connectionOptions.host'),
        port: parseInt(configService.get('sql.connectionOptions.port')),
        username: configService.get('sql.connectionOptions.username'),
        password: configService.get('sql.connectionOptions.password'),
        database: configService.get('sql.connectionOptions.database'),
        entities: [RefreshToken, User, Followers],
        synchronize: true,
      }),
  },
  {
    provide: MONGO_CONNECTION_TOKEN,
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) =>
      await createConnection({
        type: configService.get('mongo.connectionOptions.type'),
        url: configService.get('mongo.connectionOptions.uri'),
        useUnifiedTopology: true,
        useNewUrlParser: true,
        synchronize: true,
        entities: [PostSchema],
      }),
  },
];
