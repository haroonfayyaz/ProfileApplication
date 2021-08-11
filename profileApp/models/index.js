const fs = require("fs");
require("dotenv/config");
const { sequelize } = require("../dbConnection");

const createTable = (modelName, value, constraint) => {
  constraint === undefined ? { model: modelName } : constraint;
  const model = sequelize.define(modelName, value);
  model.sync();
  return model;
};

let modelsObject = {};

const requireFile = (value) => {
  const modelFile = require("./" + value);
  const result = createTable(
    modelFile.modelName,
    modelFile.modelDefinitions,
    modelFile.uniqueKeys
  );
  modelsObject[modelFile.modelName] = result;
  console.log(modelsObject);
};

const createTables = () => {
  try {
    requireFile("users.js");

    const arrayOfFiles = fs.readdirSync("./models");
    arrayOfFiles.forEach((value) => {
      if (value !== "index.js" && value !== "users.js") {
        requireFile(value);
      }
    });
  } catch (e) {
    console.log(e);
  }
};

createTables();

module.exports = { modelsObject };
