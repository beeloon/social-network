import { ConfigService } from '@nestjs/config';
import { createConnection } from 'typeorm';

import { DATABASE } from './database.constants';

import { User, Post, Follower, RefreshToken } from 'src/database/entities';

export const databaseProviders = [
  {
    provide: DATABASE.Sql,
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) =>
      await createConnection({
        type: 'mysql',
        host: configService.get('sql.connectionOptions.host'),
        port: configService.get('sql.connectionOptions.port'),
        username: configService.get('sql.connectionOptions.username'),
        password: configService.get('sql.connectionOptions.password'),
        database: configService.get('sql.connectionOptions.database'),
        entities: [User, Follower, RefreshToken],
        synchronize: true,
      }),
  },
  // {
  //   provide: DATABASE.Mongo,
  //   inject: [ConfigService],
  //   useFactory: async (configService: ConfigService) =>
  //     await createConnection({
  //       type: 'mongodb',
  //       url: configService.get('mongo.connectionOptions.uri'),
  //       useUnifiedTopology: true,
  //       useNewUrlParser: true,
  //       synchronize: true,
  //       entities: [Post],
  //     }),
  // },
];
