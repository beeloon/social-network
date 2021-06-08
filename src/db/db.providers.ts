// Вариат Димы.
// Удалил, потому что была ошибка, пофиксил по доке Неста,
// Смотри в app.module.ts
//

// import { createConnection } from 'typeorm';
// import { User } from './entities/Users/user';

// export const SQLDatabaseProviders = [
//   {
//     provide: 'SQL_DATABASE_CONNECTION',
//     useFactory: async () => {
//       await createConnection({
//         type: 'mysql',
//         host: process.env.SQL_DB_HOST,
//         port: +process.env.SQL_DB_PORT,
//         username: process.env.SQL_DB_USERNAME,
//         password: process.env.SQL_DB_PASSWORD,
//         database: process.env.SQL_DB_DATABASE,
//         entities: [User],
//       });
//     },
//   },
// ];
