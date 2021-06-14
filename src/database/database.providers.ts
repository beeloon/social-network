import { ConfigService } from '@nestjs/config';
import { createConnection } from 'typeorm';
import * as dotenv from 'dotenv'

import {
  MONGO_CONNECTION_TOKEN,
  SQL_CONNECTION_TOKEN,
} from './database.constants';

import { PostSchema, RefreshToken, User } from 'src/database/entities';

dotenv.config();

export const databaseProviders = [
  {
    provide: SQL_CONNECTION_TOKEN,
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) =>
      await createConnection({
        type: 'mysql',
        host: process.env.SQL_DB_HOST,
        port: parseInt(process.env.SQL_DB_PORT, 10) || 8080,
        username: process.env.SQL_DB_USERNAME,
        password: process.env.SQL_DB_PASSWORD,
        database: process.env.SQL_DB_DATABASE,
        entities: [RefreshToken, User],
        synchronize: true,
      }),
  },
];
