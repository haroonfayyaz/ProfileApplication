const { modelsObject } = require("../models");

const user = modelsObject["Users"];

const createUser = async (username, password, age, person_type) => {
  const newUser = await user.create({ username, password, age, person_type });
  return newUser.id;
};

const fetchAllUsersData = async () => {
  let users = [];
  const result = await user.findAll();
  result.forEach((user) => {
    users.push(user.dataValues);
  });
  return users;
};

module.exports = { createUser, fetchAllUsersData };
