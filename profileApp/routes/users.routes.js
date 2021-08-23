var express = require("express");
var usersDBController = require("../controllers/usersController");
var router = express.Router();

/* GET users listing. */
router.get("/", usersDBController.fetchAllUsersData);

/* GET Specific User Data. */
router.get("/:userId", usersDBController.fetchUserById);


/*POST user data*/
router.post("/", usersDBController.createUser);

router.delete("/:id", usersDBController.deleteProfile);


module.exports = router;


// https://expressjs.com/en/guide/routing.html