const { modelsObject } = require("../models");
const { Op } = require("sequelize");

const user = modelsObject["Users"];
const friends = modelsObject["Friends"];

const createUser = async (username, password, age, person_type) => {
  const newUser = await user.create({ username, password, age, person_type });
  return newUser.id;
};

const blockSpecificUser = async (user_id1, user_id2) => {
  console.log("user id1: " + user_id1);
  const friend = await friends.findOne({
    where: { user_id1, user_id2 },
  });
  if (!friend) {
    throw Error(`Friend not blocked`);
  }

  friend.blocked_by = user_id1;
  await friend.save();
};

const fetchAllUsersData = async () => {
  let users = [];
  const result = await user.findAll();
  result.forEach((user) => {
    users.push(user.dataValues);
  });
  return users;
};

const checkUserExists = async (id) => {
  const result = await user.findAll({
    attributes: ["id"],
    where: {
      id: {
        [Op.eq]: id,
      },
    },
  });
  if (result.length > 0) {
    return true;
  }
  return false;
};

const addFriend = async (user_id1, user_id2) => {
  await friends.create({ user_id1, user_id2 });
};
const loginUser = async (id, password) => {
  const result = await user.findAll({
    attributes: ["id", "person_type"],
    where: {
      id: {
        [Op.eq]: id,
      },
      password: {
        [Op.eq]: password,
      },
    },
  });
  if (result.length > 0) {
    return {
      personType: result[0].dataValues.person_type,
      id: result[0].dataValues.id,
    };
  }
};

module.exports = {
  createUser,
  fetchAllUsersData,
  loginUser,
  checkUserExists,
  addFriend,
  blockSpecificUser,
};
