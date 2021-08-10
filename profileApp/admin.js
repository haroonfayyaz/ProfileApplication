const _ = require("lodash");
const filing_input = require("./filing_input");

const filterByAge = async (profile) => {
  let age = parseInt(await filing_input.takeInput("Enter age: "));
  const result = _.countBy(profile, (p) => {
    return p.age < age;
  });
  let trueC = 0,
    falseC = 0;
  if (result.true !== undefined) trueC = result.true;
  if (result.false !== undefined) falseC = result.false;

  console.log(`There are ${trueC} users that are under ${age}`);
  console.log(`There are ${falseC} users that are ${age}+`);
};

const displayMutualFriends = async (profile) => {
  try {
    let id1 = parseInt(await filing_input.takeInput("Enter id of user 1: "));
    let id2 = parseInt(await filing_input.takeInput("Enter id of user 2: "));
    let index1 = profile.findIndex((x) => x.id === id1);
    if (index1 === -1) {
      console.log("User with id " + id1 + " not found");
      return;
    }
    let index2 = profile.findIndex((x) => x.id === id2);
    if (index2 === -1) {
      console.log("User with id " + id2 + " not found");
      return;
    }
    const friends1 = profile[index1].friends;
    const friends2 = profile[index2].friends;
    const mutual = _.intersection(friends1, friends2);
    if (mutual.length == 0) {
      console.log("Both users has no mutual friends");
    } else
      console.log(
        `The mutual friends of ${profile[index1].username} and ${profile[index2].username} are: `
      );
    mutual.forEach((element) => {
      let index = profile.findIndex((x) => x.id === element);
      console.log(profile[index].username);
    });
  } catch (err) {
    console.error(err.message);
  }
};

const deleteProfile = async (profile) => {
  try {
    let id = parseInt(
      await filing_input.takeInput("Enter id to delete a profile: ")
    );
    let index2 = profile.findIndex((x) => x.id === id);
    if (index2 !== -1) {
      profile.splice(index2, 1);
      console.log("User with this id is deleted successfully");
    } else {
      console.log("User with this id doesn't exist");
    }
  } catch (err) {
    console.error(err);
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
};
