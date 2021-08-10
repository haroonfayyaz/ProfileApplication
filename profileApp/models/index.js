const fs = require("fs");
require("dotenv/config");
const { sequelize } = require("../dbConnection");

const createTable = (modelName, value) => {
  const model = sequelize.define(modelName, value);
  model.sync();
  return model;
};

let modelsObject = {};

const createTables = () => {
  try {
    const arrayOfFiles = fs.readdirSync("./models");
    arrayOfFiles.forEach((value) => {
      if (value !== "index.js") {
        const modelFile = require("./" + value);
        const result = createTable(
          modelFile.modelName,
          modelFile.modelDefinitions
        );
        modelsObject[modelFile.modelName] = result;
        console.log(modelsObject);
      }
    });
  } catch (e) {
    console.log(e);
  }
};

createTables();

module.exports = { modelsObject };
