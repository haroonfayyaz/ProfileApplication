const { modelsObject } = require("../models");
const { Op } = require("sequelize");
const { sequelize } = require("../dbConnection");
const users = require("../users");

const user = modelsObject["users"];
const friends = modelsObject["friends"];
const messages = modelsObject["messages"];

const createUser = async (username, password, age, person_type) => {
  const newUser = await user.create({ username, password, age, person_type });
  return newUser.id;
};

const createBulkUser = async (dataArr) => {
  const newUser = await user.bulkCreate(dataArr);
  // return newUser.id;
};

const blockSpecificUser = async (user_id1, user_id2) => {
  console.log("user id1: " + user_id1);
  const friend = await friends.findOne({
    include: {
      model: user,
      as: "user_id1",
    },
    where: {
      [Op.or]: [
        { [Op.and]: [{ user_id1, user_id2 }] },
        { [Op.and]: [{ user_id1: user_id2, user_id2: user_id1 }] },
      ],
    },
  });
  if (!friend) {
    console.log("You are not friends with this user");
    return;
  }

  friend.blocked_by = user_id1;
  await friend.save();
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

const displayNamesStartingWithSpecificString = async (substring) => {
  const result = await user.findAll({
    attributes: ["username"],
    where: { username: { [Op.like]: `${substring + "%"}` } },
  });
  if (result.length > 0) {
    console.log("Names starting with ", substring, " are: ");
  } else {
    console.log("No name starting with these characters");
  }
  for (const user of result) {
    console.log(user.dataValues.username);
  }
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

const viewMutualFriends = async (id, friendId) => {
  try {
    const result = await sequelize.query(
      `SELECT username FROM users WHERE id IN(
        SELECT users FROM
        (SELECT user_id2 AS 'users'
          FROM Friends
          WHERE  user_id1=${id} UNION SELECT user_id1 AS 'users'
          FROM Friends
          WHERE  user_id2=${id} ) f1
        INNER JOIN
        (SELECT user_id2 AS 'users'
          FROM Friends
          WHERE user_id1=${friendId} UNION SELECT user_id1 AS 'users'
          FROM Friends
          WHERE  user_id2=${friendId}) f2 USING(users));`
    );
    result.forEach((user) => {
      console.log("The mutual friend(s) are: ");
      user.forEach((userId) => {
        console.log(userId.username);
      });
      throw console.log("No mututal friend(s) exist");
    });
  } catch (err) {}
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

const viewBlockedUsers = async (id) => {
  try {
    const result = await sequelize.query(
      `SELECT distinct username FROM Users where id IN(SELECT user_id1 AS 'users' FROM Friends WHERE blocked_by=${id} AND user_id2=${id} UNION SELECT user_id2 AS 'users' FROM Friends WHERE blocked_by=${id} AND user_id1=${id});`
    );
    result.forEach((user) => {
      console.log("The blocked users are: ");
      user.forEach((userId) => {
        console.log(userId.username);
      });
      throw console.log("");
    });
  } catch (err) {}
};

const sendMessage = async (messageObject) => {
  await messages.create(messageObject);
};

const viewLastMessage = async (id, userId) => {
  const result = await messages.findOne({
    attributes: ["message"],
    where: {
      [Op.or]: [
        { [Op.and]: [{ from: id, to: userId }] },
        { [Op.and]: [{ from: userId, to: id }] },
      ],
    },
    order: [["date", "DESC"]],
    limit: 1,
  });
  if (result !== undefined && result !== null) {
    return result.dataValues.message;
  } else {
    return "No message found";
  }
};

const filterByAge = async (age) => {
  const result = await user.count({
    where: {
      age: {
        [Op.gt]: `${age}`,
      },
    },
  });
  console.log(`The total number of users that are ${age}+ are: `, result);
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
};
