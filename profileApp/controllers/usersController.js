const { modelsObject } = require("../models");
const { Op } = require("sequelize");
const { sequelize } = require("../dbConnection");

const user = modelsObject["users"];
const friends = modelsObject["friends"];
const messages = modelsObject["messages"];

const createUser = async (username, password, age, person_type) => {
  const newUser = await user.create({ username, password, age, person_type });
  return newUser.id;
};




const fetchAllUsersData = async () => {
  let users = [];
  if (user !== undefined) {
    const result = await user.findAll();
    for (const user of result) {
      users.push(user.dataValues);
    }
  }

  return users;
};

const fetchUserById = async (req, res) => {
  const userId = req.params.userId;
  const result = await user.findByPk(userId);
  res.send(result)
};

const deleteProfile = async (id) => {
  console.log("id: ", id);
  await friends.destroy({
    where: {
      [Op.or]: [{ user_id1: id, user_id2: id }],
    },
  });
  const result = await user.destroy({
    where: { id },
  });
  console.log(result);
};





module.exports = {
  createUser,
  createBulkUser,
  fetchAllUsersData,
  loginUser,
  checkUserExists,
  addFriend,
  blockSpecificUser,
  sendMessage,
  viewLastMessage,
  viewBlockedUsers,
  filterByAge,
  viewMutualFriends,
  deleteProfile,
  displayNamesStartingWithSpecificString,
  fetchUserById,
};
