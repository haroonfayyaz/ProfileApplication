const { Sequelize, DataTypes } = require("sequelize");

const modelName = "users";

module.exports = {
  modelName,
  createTable: (sequelize) => {
    const model = sequelize.define(
      modelName,
      {
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
      },
      {
        createdAt: "created_at",
        updatedAt: "updated_at",
        deletedAt: "deleted_at",
        timestamps: true,
        paranoid: true,
        underscore: true,
        cascade: true,
      }
    );
    return model;
  },
};
