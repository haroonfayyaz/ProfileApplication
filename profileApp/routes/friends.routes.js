var express = require("express");
var friendsDBController = require("../controllers/friendsController");
var router = express.Router();

/* GET friends listing. */
router.get("/", friendsDBController.fetchAllFriendsData);

/* GET Specific Friend Data. */
router.get("/:id", friendsDBController.fetchFriendById);

/*POST Friend data*/
router.post("/", friendsDBController.createFriend);

/* DELETE Friend Data */
router.delete("/:id", friendsDBController.deleteFriend);

/* UPDATE Friend Data */
router.put("/:id", friendsDBController.updateFriend);

module.exports = router;
