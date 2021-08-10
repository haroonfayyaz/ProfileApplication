const { DataTypes } = require("sequelize");

const modelName = "Friends";
const modelDefinitions = {
  user_id1: {
    type: DataTypes.INTEGER,
    references: { model: "users", key: "id" },
  },
  user_id2: {
    type: DataTypes.INTEGER,
    references: { model: "users", key: "id" },
  },
  blocked_by: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
};
const uniqueKeys = {
  uniqueKeys: {
    Items_unique: {
      fields: ["user_id1", "user_id2"],
    },
  },
};
module.exports = { modelName, modelDefinitions, uniqueKeys };
