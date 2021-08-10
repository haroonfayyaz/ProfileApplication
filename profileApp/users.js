const filing_input = require("./filing_input");
const _ = require("lodash");
const usersDBController = require("./controllers/usersDBController");

const login = async (profile, id, password) => {
  const result = profile.find((p) => p.id === id && p.password === password);
  return result === undefined ? [false] : [result.personType, result.id];
};

const chatWithSomeone = async (profile, id, messages) => {
  const msg = await filing_input.takeInput("Enter message to send: ");
  const userIndex = profile.findIndex((x) => x.id === id);
  let receiverIndex;
  let receiverId;
  while (true) {
    receiverId = await filing_input.takeInput(
      "Enter id of the receiver(n to exit input): "
    );
    receiverIndex = await profile.findIndex(
      (p) => p.id === parseInt(receiverId)
    );
    if (userIndex != receiverIndex && receiverIndex !== -1) {
      break;
    } else if (receiverId.toLowerCase() === "n") return;
    else {
      console.log("Not a valid receiver id, try again!");
    }
  }
  messages.push({
    message: msg,
    from: id,
    to: parseInt(receiverId),
    date: new Date(),
  });
  console.log("Message Sent!");
  filing_input.writeDataToFile(
    "messages.json",
    JSON.stringify(messages, null, 2)
  );
};

const viewBlockedUsers = async (profile, id) => {
  const userIndex = profile.findIndex((x) => x.id === id);
  if (userIndex != -1) {
    console.log(profile[userIndex].blockList);
  } else console.log("User with thus id not found!");
};

const getMaxId = (profile) =>
  profile.length === 0
    ? 0
    : profile.reduce(
        (max, character) => (character.id > max ? character.id : max),
        profile[0].id
      );

const blockUser = async (profile, id) => {
  const userIndex = profile.findIndex((x) => x.id === id);
  console.log(userIndex);
  if (userIndex === -1) return;
  let othersId;
  while (true) {
    othersId = parseInt(
      await filing_input.takeInput("Enter id of the person you want to block: ")
    );
    if (othersId !== NaN) break;
  }
  const othersIndex = profile.findIndex((x) => x.id === othersId);
  if (othersIndex === -1) {
    console.log("User with this id doesn't exist");
    return;
  }
  if (profile[userIndex].blockList.indexOf(othersId) === -1) {
    profile[userIndex].blockList.push(othersIndex);
  }
  filing_input.writeDataToFile(
    "profile.json",
    JSON.stringify(profile, null, 2)
  );
  console.log(JSON.stringify(profile, null, 2));
};

const viewLastMessage = async (id, messages) => {
  let userId;
  let data2 = await filing_input.readDataFromFile("messages.json");
  messages = data2 == false ? [] : JSON.parse(data2);
  while (true) {
    userId = parseInt(await filing_input.takeInput("Enter id of other user: "));
    if (userId !== NaN) break;
    console.log("Not a valid input try again!");
  }
  const result = _.findLast(
    messages,
    (x) =>
      (x.from === userId && x.to === id) || (x.to === userId && x.from === id)
  );

  console.log(result === undefined ? "No message found" : result.message);
};

const createProfile = async (profile) => {
  try {
    let name = await filing_input.takeInput("Enter your name: ");
    let password = await filing_input.takeInput("Enter your password: ");
    let age = parseInt(await filing_input.takeInput("Enter your age: "));
    let friend = await filing_input.takeInput(
      "Enter your friends(in csv format , seperated): "
    );
    // let friends = friend.indexOf(",") !== -1 ? friend.trim().split(",") : [];

    // if (friends.length > 0) {
    //   friends = friends.map((x) => {
    //     const result = parseInt(x);
    //     if (result == NaN) {
    //       return 0;
    //     } else return result;
    //   });
    // }
    // const id = getMaxId(profile) + 1;

    // for (let i = 0; i < friends.length; i++) {
    //   let index = profile.findIndex((x) => {
    //     x.id === friends[i];
    //   });
    //   if (index != -1) profile[index].friends.push(id);
    // }

    // let obj = {
    //   id,
    //   password: password,
    //   username: name,
    //   age: age,
    //   friends: friends,
    //   blockList: [],
    //   personType: "user",
    // };
    // console.log("Your id is " + id);
    // profile.push(obj);
    // const id = await usersDBController.createUser(name, password, age, "user");
    const id = 9;
    return ["user", id];
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  login,
  createProfile,
  blockUser,
  chatWithSomeone,
  viewLastMessage,
  viewBlockedUsers,
};
