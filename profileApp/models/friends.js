const { DataTypes } = require("sequelize");

const modelName = "Friends";
const modelDefinitions = {
  userid1: {
    type: DataTypes.INTEGER,
    references: { model: "users", key: "id" },
  },
  userid2: {
    type: DataTypes.INTEGER,
    references: { model: "users", key: "id" },
  },
  blockedBy: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
};

module.exports = { modelName, modelDefinitions };
