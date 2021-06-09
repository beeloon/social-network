import { registerAs } from '@nestjs/config';

export default registerAs('sql', () => ({
  connectionOptions: {
    type: process.env.SQL_DB_DIALECT,
    host: process.env.SQL_DB_HOST,
    port: parseInt(process.env.SQL_DB_PORT, 10) || 8080,
    username: process.env.SQL_DB_USERNAME,
    password: process.env.SQL_DB_PASSWORD,
    database: process.env.SQL_DB_DATABASE,
  },
}));
