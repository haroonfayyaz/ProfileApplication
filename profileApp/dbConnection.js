const config = require("./config");
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  config.dbName,
  config.username,
  config.password,
  {
    host: config.hostname,
    dialect: "postgres",
  }
);

const checkConnection = async () => {
  try {
    console.log("config:", config);
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

module.exports = { checkConnection, sequelize };
