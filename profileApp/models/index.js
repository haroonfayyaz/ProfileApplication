const fs = require("fs");
require("dotenv/config");
const { sequelize, checkConnection } = require("../dbConnection");

console.log(checkConnection());

try {
  const arrayOfFiles = fs.readdirSync("./AllModels");
  arrayOfFiles.forEach((value) => {
    if (value !== "index.js") {
      const modelFile = require("./" + value);
      sequelize.define(modelFile.modelName, modelFile.modelDefinitions);
    }
  });
  sequelize.sync().then(() => {
    console.log("All models were synchronized successfully.");
  });
} catch (e) {
  console.log(e);
}
