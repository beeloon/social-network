import { registerAs } from '@nestjs/config';

export default registerAs('mongo', () => ({
  connectionOptions: {
    uri: process.env.MONGO_DB_URI,
  },
}));
