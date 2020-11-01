export const environment = {
  production: false,
  database: {
    type: process.env.DB_TYPE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
  }
};
