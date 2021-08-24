var express = require("express");
var usersDBController = require("../controllers/usersController");
var router = express.Router();

/* GET users listing. */
router.get("/", usersDBController.fetchAllUsersData);

/* GET Specific User Data. */
router.get("/:id", usersDBController.fetchUserById);

/*POST user data*/
router.post("/", usersDBController.createUser);

/* DELETE USER DATA */
router.delete("/:id", usersDBController.deleteProfile);

/* UPDATE USER DATA */
router.put("/:id", usersDBController.updateProfile);

module.exports = router;
