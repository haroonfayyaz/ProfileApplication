const filing_input = require("./filing_input");
const _ = require("lodash");
const usersDBController = require("./controllers/usersDBController");

const login = async (id, password) => {
  const result = await usersDBController.loginUser(id, password);
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

const blockUser = async (id) => {
  let othersId;
  while (true) {
    othersId = parseInt(
      await filing_input.takeInput("Enter id of the person you want to block: ")
    );
    if (othersId !== NaN) break;
  }
  const isExist = await usersDBController.checkUserExists(othersId);
  if (!isExist) {
    console.log("User with this id doesn't exist");
    return;
  }
  console.log(id);
  await usersDBController.blockSpecificUser(id, othersId);
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

const createProfile = async () => {
  try {
    let name = await filing_input.takeInput("Enter your name: ");
    let password = await filing_input.takeInput("Enter your password: ");
    let age = parseInt(await filing_input.takeInput("Enter your age: "));
    let friend = await filing_input.takeInput(
      "Enter your friends(in csv format , seperated): "
    );
    let friends = friend.indexOf(",") !== -1 ? friend.trim().split(",") : [];
    const id = await usersDBController.createUser(name, password, age, "user");
    console.log("id: ", id);
    if (friends.length > 0) {
      friends = friends.map((x) => {
        const result = parseInt(x);
        if (result == NaN) {
          return 0;
        } else return result;
      });
    }

    for (let i = 0; i < friends.length; i++) {
      const isExist = await usersDBController.checkUserExists(friends[i]);
      if (isExist) {
        await usersDBController.addFriend(id, friends[i]);
      }
    }

    // const id = 9;
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
