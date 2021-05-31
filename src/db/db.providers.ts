import { Sequelize } from 'sequelize-typescript';
import { Users } from './entities/Users/user';
//import dotenv from 'dotenv';
//console.log(dotenv);
//const { DB_USER, DB_PASSWORD }: any = dotenv.config();

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'balu2000',
        database: 'nestJs',
      });
      sequelize.addModels([Users]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
