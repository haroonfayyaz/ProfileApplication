const fs = require("fs");
require("dotenv/config");
const { sequelize } = require("../dbConnection");

let modelsObject = {};

const requireFile = (fileName) => {
  const modelFile = require("./" + fileName);
  const model = modelFile.createTable(sequelize);
  model.sync();
  modelsObject[modelFile.modelName] = model;
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
    modelsObject["users"].hasMany(modelsObject["friends"]);
    modelsObject["friends"].belongsTo(modelsObject["users"]);
  } catch (e) {
    console.log(e);
  }
};

createTables();

module.exports = { modelsObject };
