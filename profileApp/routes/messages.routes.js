var express = require("express");
var messagesDBController = require("../controllers/messagesController");
var router = express.Router();

/* GET messages listing. */
router.get("/", messagesDBController.fetchAllMessagesData);

/* GET Specific Message Data. */
router.get("/:id", messagesDBController.fetchMessageById);

/*POST Message data*/
router.post("/", messagesDBController.createMessage);

/* DELETE Message Data */
router.delete("/:id", messagesDBController.deleteMessage);

/* UPDATE Message Data */
router.put("/:id", messagesDBController.updateMessage);

module.exports = router;
