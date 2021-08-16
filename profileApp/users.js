const filing_input = require("./filing_input");
const _ = require("lodash");
const usersDBController = require("./controllers/usersDBController");
const { parse } = require("dotenv");

const login = async (id, password) => {
  const result = await usersDBController.loginUser(id, password);
  return result === undefined ? [false] : [result.personType, result.id];
};

const chatWithSomeone = async (id) => {
  const msg = await filing_input.takeInput("Enter message to send: ");

  while (true) {
    receiverId = parseInt(
      await filing_input.takeInput(
        "Enter id of the receiver(-1 to exit input): "
      )
    );
    if (receiverId === NaN) {
      console.log("Not a valid receiver id, try again!");
    } else if (!(await usersDBController.checkUserExists(receiverId))) {
      console.log("User with this id doesn't exist");
      break;
    } else if (receiverId === -1) return;
    else {
      break;
    }
  }
  await usersDBController.sendMessage({
    message: msg,
    from: id,
    to: receiverId,
    date: new Date(),
  });

  console.log("Message Sent!");
};

const viewBlockedUsers = async (id) => {
  const result = await usersDBController.viewBlockedUsers(id);
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
  await usersDBController.blockSpecificUser(id, othersId);
};

const viewLastMessage = async (id) => {
  let userId;
  while (true) {
    userId = parseInt(await filing_input.takeInput("Enter id of other user: "));
    if (userId !== NaN) break;
    console.log("Not a valid input try again!");
  }

  const result = await usersDBController.viewLastMessage(id, userId);

  console.log(result);
};

const addFriend = async (id) => {
  let friendId;
  while (true) {
    friendId = parseInt(await filing_input.takeInput("Enter friend Id: "));
    if (friendId !== NaN) break;
  }

  const isExist = await usersDBController.checkUserExists(friendId);
  if (isExist) {
    await usersDBController.addFriend(id, friendId);
  }
};

const createProfile = async () => {
  // const arr = [
  //   {
  //     username: "haroon",
  //     password: "1234",
  //     age: "17",
  //     person_type: "user",
  //   },
  //   {
  //     username: "ahmad",
  //     password: "1234",
  //     age: "18",
  //     person_type: "user",
  //   },
  // ];
  // await usersDBController.createBulkUser(arr);
  // try {
  //   await usersDBController.addFriend(3, 2);
  // } catch (err) {}
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
  addFriend,
};
