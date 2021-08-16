const { DataTypes } = require("sequelize");
require("../globals");
const modelName = "messages";
module.exports = {
  modelName,
  createTable: (sequelize) => {
    const model = sequelize.define(
      modelName,
      {
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
      },
      {
        createdAt: "created_at",
        updatedAt: "updated_at",
        underscore: true,
        hooks: {
          afterCreate: (message, options) => {
            console.log(userId);
            if (message.dataValues.to === userId) console.log(message);
            console.log("Options:", options);
          },
        },
      }
    );
    return model;
  },
};
