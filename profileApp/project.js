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
const usersDBController = require("./controllers/usersDBController");

const takeCredentials = async (profile) => {
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
    // let data = await filing_input.readDataFromFile("profile.json");
    let data2 = await filing_input.readDataFromFile("messages.json");

    let profile = await usersDBController.fetchAllUsersData();
    let messages = data2 == false ? [] : JSON.parse(data2);

    if (profile.length == 0) {
      await usersDBController.createUser("admin", "admin", 0, "admin");
    }
    while (true) {
      let loginOption = await filing_input.takeInput(
        "1. Login, 2. Sign Up, 3. Log Out. Enter your option: "
      );
      if (loginOption === "3") return;
      let loginVerification;
      switch (loginOption) {
        case "1":
          loginVerification = await takeCredentials(profile);
          if (loginVerification[0] === false)
            console.log("Invalid Credentials");
          break;
        case "2":
          loginVerification = await users.createProfile(profile);
          filing_input.writeDataToFile(
            "profile.json",
            JSON.stringify(profile, null, 2)
          );
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
              await users.blockUser(profile, loginVerification[1]);
              break;
            case "2":
              await users.chatWithSomeone(
                profile,
                loginVerification[1],
                messages
              );
              break;
            case "3":
              await users.viewBlockedUsers(profile, loginVerification[1]);
              break;
            case "4":
              await users.viewLastMessage(loginVerification[1], messages);
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
              await admin.filterByAge(profile);
              break;
            case 3:
              await admin.displayMutualFriends(profile);
              break;
            case 4:
              await admin.deleteProfile(profile);
              filing_input.writeDataToFile(
                "profile.json",
                JSON.stringify(profile, null, 2)
              );
              break;
            case 5:
              await admin.namesStartingWith(profile);
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
