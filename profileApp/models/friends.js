const { DataTypes } = require("sequelize");

const modelName = "friends";

module.exports = {
  modelName,
  createTable: (sequelize) => {
    const model = sequelize.define(
      modelName,
      {
        user_id1: {
          type: DataTypes.INTEGER,
          onDelete: "CASCADE",
          onUpdate: "CASCADE",
          references: { model: "users", key: "id" },
        },
        user_id2: {
          type: DataTypes.INTEGER,
          onDelete: "CASCADE",
          onUpdate: "CASCADE",
          references: { model: "users", key: "id" },
        },
        blocked_by: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
      },
      {
        createdAt: "created_at",
        updatedAt: "updated_at",
        underscore: true,
        uniqueKeys: {
          Items_unique: {
            fields: ["user_id1", "user_id2"],
          },
        },
      }
    );
    return model;
  },
};
