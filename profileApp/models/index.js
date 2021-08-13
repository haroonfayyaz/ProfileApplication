const fs = require("fs");
require("dotenv/config");
const { sequelize } = require("../dbConnection");

let modelsObject = {};

const requireFile = (fileName) => {
  const modelFile = require("./" + fileName);
  const model = modelFile.createTable(sequelize);
  model.sync({ force: true });
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
    modelsObject["users"].belongsToMany(modelsObject["users"], {
      through: modelsObject["friends"],
      as: "users",
      foreignKey: "user_id1",
      otherKey: "user_id2",
      onDelete: "cascade",
      onUpdate: "cascade",
    });
    modelsObject["friends"].belongsTo(modelsObject["users"], {
      foreignKey: "user_id1",
      onDelete: "cascade",
      onUpdate: "cascade",
    });
    modelsObject["friends"].belongsTo(modelsObject["users"], {
      foreignKey: "user_id2",
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  } catch (e) {
    console.log(e);
  }
};

createTables();

module.exports = { modelsObject };
