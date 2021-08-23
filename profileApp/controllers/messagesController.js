const { modelsObject } = require("../models");
const { Op } = require("sequelize");
const { sequelize } = require("../dbConnection");

const messages = modelsObject["messages"];
