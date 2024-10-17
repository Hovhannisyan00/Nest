export const SERVER_CONFIG = Object.freeze({
  APP_PORT: process.env.APP_PORT || 4400,
  db_port: process.env.DB_PORT,
  db_host: process.env.DB_HOST,
  db_name: process.env.DB_NAME,
  db_password: process.env.DB_PASSWORD,
  db_user: process.env.DB_USER,
});
