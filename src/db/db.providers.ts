import { Sequelize } from 'sequelize-typescript';
import { User } from './entities/Users/user';

export const databaseProviders = [
  {
    provide: 'SQL_DATABASE_CONNECTION',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: process.env.SQL_DB_DIALECT as any,
        host: process.env.SQL_DB_HOST,
        port: +process.env.SQL_DB_PORT,
        username: process.env.SQL_DB_USERNAME,
        password: process.env.SQL_DB_PASSWORD,
        database: process.env.SQL_DATABASE,
      });
      sequelize.addModels([User]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
