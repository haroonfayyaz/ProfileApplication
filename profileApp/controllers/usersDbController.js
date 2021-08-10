const { modelsObject } = require("../models");

const user = modelsObject["Users"];

const createUser = async (username, password, age, person_type) => {
  const newUser = await user.create({ username, password, age, person_type });
  return newUser.id;
};

const fetchAllUsersData = async () => {
  return await user.findAll();
};
