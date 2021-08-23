var express = require("express");
var usersDBController = require("../controllers/usersController");
var router = express.Router();

/* GET users listing. */
router.get("/users/", function (res) {
  res.send(usersDBController.fetchAllUsersData());
});

/* GET Specific User Data. */
router.get("/users/:userId", usersDBController.fetchUserById);

module.exports = router;
