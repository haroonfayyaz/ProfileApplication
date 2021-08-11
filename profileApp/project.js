/*
Let’s assume you make a team of developers and that team is going to make a new social network.
Every user has a profile.That profile includes the folowing: 1.UserName
2.UserAge
3.UserID(Uniqueforeachuseronthenetwork)
4.FriendsList(containingtheUserIDsoftheotherusersofthesamesocial networkwhicharefriendswiththisuser)
 UserIDs are predefined,whenever you create a newuser,assign any of those availableIDs and keep record whichIDs are taken so that nexttime you donot assign takenID to newuser.
 Friend list of a user can only contain the userIDs which are taken at the creation of his/her profile.
 Write a function to take inputs for a user profile.
 Write another function that takes two diferent users as argument and counts the number of mutual friends between them using the search techniques you have studied in your CP course.This function should return how many mutual friends were found.

*/

const _ = require("lodash");
const users = require("./users");
const filing_input = require("./filing_input");
const admin = require("./admin");

const takeCredentials = async () => {
  let id;
  while (true) {
    id = parseInt(await filing_input.takeInput("Enter id: "));
    if (id != NaN) break;
    else {
      console.log("Id should be a number");
    }
  }
  let password = await filing_input.takeInput("Enter password: ");
  return await users.login(id, password);
};

const displayMenu = async () => {
  try {
    await admin.checkAdminRecord();
    while (true) {
      let loginOption = await filing_input.takeInput(
        "1. Login, 2. Sign Up, 3. Log Out. Enter your option: "
      );
      if (loginOption === "3") return;
      let loginVerification;
      switch (loginOption) {
        case "1":
          loginVerification = await takeCredentials();
          if (loginVerification[0] === false)
            console.log("Invalid Credentials");
          break;
        case "2":
          loginVerification = await users.createProfile();
          break;
        case "3":
          console.log("exit");
          return;
        default:
          break;
      }
      let flag = true;
      while (flag && loginVerification != undefined) {
        if (loginVerification[0] === "user") {
          let option = await filing_input.takeInput(
            "1. Block User, 2. Chat with someone, 3. View Blocked Users, 4. View Last Message, 5. Exit.\nEnter your option: "
          );
          switch (option) {
            case "1":
              await users.blockUser(loginVerification[1]);
              break;
            case "2":
              await users.chatWithSomeone(loginVerification[1]);
              break;
            case "3":
              await users.viewBlockedUsers(loginVerification[1]);
              break;
            case "4":
              await users.viewLastMessage(loginVerification[1]);
              break;
            case "5":
              flag = false;
              break;
          }
        } else if (loginVerification[0] === "admin") {
          let option = await filing_input.takeInput(
            "2. Filter by age, 3. Display Mutual Friends, 4. Delete a profile, 5. All names starting with a specific letter, 6. Exit.\nEnter your option: "
          );
          option = parseInt(option);
          switch (option) {
            case 2:
              await admin.filterByAge();
              break;
            case 3:
              await admin.displayMutualFriends();
              break;
            case 4:
              await admin.deleteProfile();
              break;
            case 5:
              await admin.namesStartingWith();
              break;
            case 6:
              return;
            default:
              break;
          }
        } else return;
      }
    }
  } catch (err) {
    console.error(err);
  }
};

// console.log(userDbController.)
displayMenu();
