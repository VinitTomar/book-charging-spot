export const environment = {
  production: false,
  database: {
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    database: process.env.DB_DATABASE_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
  },
  mailTrap: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS
  },
  debug: process.env.DEBUG.toLowerCase() !== 'false',
  bcryptHashRounds: +process.env.BCRYPT_HASH_ROUNDS,
  jwt: {
    secret: process.env.JWT_GENERATION_SECRET,
    expiresIn: process.env.JWT_TOKEN_EXPIRATION
  }
};
