require("dotenv/config.js");

module.exports = {
  hostname: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  dbName: process.env.DB_NAME,
};
