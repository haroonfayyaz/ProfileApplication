const { Sequelize, DataTypes } = require("sequelize");
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
          defaultValue: Sequelize.NOW,
        },
      },
      {
        createdAt: "created_at",
        updatedAt: "updated_at",
        underscore: true,
        hooks: {
          afterCreate: (message, options) => {
            console.log(message.dataValues);
          },
        },
      }
    );
    return model;
  },
};
