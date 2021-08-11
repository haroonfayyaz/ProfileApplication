const _ = require("lodash");
const filing_input = require("./filing_input");
const usersDBController = require("./controllers/usersDBController");

const filterByAge = async () => {
  let age;
  while (true) {
    age = parseInt(await filing_input.takeInput("Enter age: "));
    if (age != NaN) break;
  }

  await usersDBController.filterByAge(age);
};

const displayMutualFriends = async () => {
  try {
    let id1 = parseInt(await filing_input.takeInput("Enter id of user 1: "));
    let id2 = parseInt(await filing_input.takeInput("Enter id of user 2: "));

    const mutual = await usersDBController.viewMutualFriends(id1, id2);
  } catch (err) {
    console.error(err.message);
  }
};

const deleteProfile = async () => {
  try {
    let id;
    while (true) {
      id = parseInt(
        await filing_input.takeInput("Enter id to delete a profile: ")
      );
      if (id !== NaN) break;
    }
    await usersDBController.deleteProfile(id);
  } catch (err) {
    console.error(err);
  }
};

const checkAdminRecord = async () => {
  const result = await usersDBController.fetchAllUsersData();
  if (result.length == 0) {
    await usersDBController.createUser("admin", "admin", 0, "admin");
  }
};

const namesStartingWith = async (profile) => {
  let x = await filing_input.takeInput("Enter the characters: ").toLowerCase();
  var result = _.filter(profile, (item) => {
    return _.startsWith(item.username.toLowerCase(), x);
  });
  console.log(result);
};

module.exports = {
  filterByAge,
  namesStartingWith,
  deleteProfile,
  displayMutualFriends,
  checkAdminRecord,
};
