import { registerAs } from '@nestjs/config';

export default registerAs('sql', () => ({
  connectionOptions: {
    dialect: process.env.SQL_DB_DIALECT,
    port: parseInt(process.env.SQL_DB_PORT, 10) || 8080,
    host: process.env.SQL_DB_HOST,
    username: process.env.SQL_DB_USERNAME,
    password: process.env.SQL_DB_PASSWORD,
    database: process.env.SQL_DB_DATABASE,
  },
}));
