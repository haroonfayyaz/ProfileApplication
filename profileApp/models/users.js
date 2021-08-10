const { Sequelize, DataTypes } = require("sequelize");

const modelName = "Users";
const modelDefinitions = {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  age: {
    type: DataTypes.INTEGER,
  },
  person_type: {
    type: DataTypes.STRING,
  },
};

module.exports = { modelName, modelDefinitions };
