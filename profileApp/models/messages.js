const { DataTypes } = require("sequelize");

const modelName = "Message";
const modelDefinitions = {
  message: {
    type: DataTypes.STRING,
  },
  from: {
    type: DataTypes.INTEGER,
  },
  to: {
    type: DataTypes.INTEGER,
  },
  date: {
    type: DataTypes.DATE,
  },
};

module.exports = { modelName, modelDefinitions };
