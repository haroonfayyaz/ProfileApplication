var express = require("express");
// var usersDBController = require("../controllers/usersController");
var router = express.Router();

/* GET users listing. */
router.get("/", (req, res) => {
  console.log(req);
  console.log("dsaddsf");
  return res.send("fdfdfdfd");
  // return res.send(rusersDBController.fetchAllUsersData());
});

// /* GET Specific User Data. */
// router.get("/:userId", usersDBController.fetchUserById);

module.exports = router;
