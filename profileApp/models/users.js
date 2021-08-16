const { Sequelize, DataTypes } = require("sequelize");
var CryptoJS = require("crypto-js");

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
          set(value) {
            this.setDataValue(
              "password",
              CryptoJS.AES.encrypt(value, "secret key 123").toString()
            );
          },
          get() {
            console.log("In getter");
            const password = this.getDataValue("password");
            const bytes = CryptoJS.AES.decrypt(password, "secret key 123");
            console.log("bytes:", bytes.toString(CryptoJS.enc.Utf8));
            return bytes.toString(CryptoJS.enc.Utf8);
            // return password;
          },
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
        underscore: true,
        cascade: true,
        // getterMethods: {
        //   password: function () {
        //     const password = this.getDataValue("password");
        //     const bytes = CryptoJS.AES.decrypt(password, "secret key 123");
        //     console.log("bytes:", bytes.toString(CryptoJS.enc.Utf8));
        //     return bytes.toString(CryptoJS.enc.Utf8);
        //   },
        // },
      }
    );
    return model;
  },
};
