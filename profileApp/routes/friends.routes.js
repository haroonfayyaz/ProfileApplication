var express = require("express");
var friendsDBController = require("../controllers/friendsController");
var router = express.Router();

/* GET friends listing. */
router.get("/", friendsDBController.fetchAllFriendsData);

/* GET Specific Friend Data. */
router.get("/:id", friendsDBController.fetchFriendById);

/*POST user data*/
router.post("/", friendsDBController.createFriend);

router.delete("/:id", friendsDBController.deleteFriend);

router.put("/:id", friendsDBController.updateFriend);

module.exports = router;
