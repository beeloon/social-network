interface Configuration {
  port: number;
  token: {
    secret: string;
    expiresIn: string;
  };
  refresh: {
    ttl: number;
  };
  mongo: {
    connectionOptions: {
      uri: string;
    };
  };
  sql: {
    connectionOptions: {
      type: string;
      host: string;
      port: number;
      username: string;
      password: string;
      database: string;
    };
  };
}

interface ProcessEnv {
  [key: string]: string | undefined;
}

const ENV: ProcessEnv = process.env;

const configuration = (): Configuration => ({
  port: parseInt(ENV.PORT, 10) || 8080,
  token: {
    secret: ENV.JWT_ACCESS_TOKEN_SECRET,
    expiresIn: ENV.JWT_ACCESS_TOKEN_EXPIRATION_TIME,
  },
  refresh: {
    ttl: parseInt(ENV.REFRESH_TOKEN_TTL, 10),
  },
  mongo: {
    connectionOptions: {
      uri: ENV.MONGO_DB_URI,
    },
  },
  sql: {
    connectionOptions: {
      type: ENV.SQL_DB_DIALECT,
      host: ENV.SQL_DB_HOST,
      port: parseInt(ENV.SQL_DB_PORT, 10) || 8080,
      username: ENV.SQL_DB_USERNAME,
      password: ENV.SQL_DB_PASSWORD,
      database: ENV.SQL_DB_DATABASE,
    },
  },
});

export default configuration;
