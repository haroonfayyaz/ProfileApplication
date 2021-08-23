var express = require("express");
var usersDBController = require("../controllers/usersController");
var router = express.Router();

/* GET users listing. */
router.get("/", (req, res) => {
  return res.send(usersDBController.fetchAllUsersData());
});

/* GET Specific User Data. */
router.get("/:userId", usersDBController.fetchUserById);

module.exports = router;
