const express= require('express');
const { sendMessage, allMessage } = require('../controller/messageController');
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
router.route("/").post(protect , sendMessage)
router.route("/:chatId").post(protect , allMessage )

module.exports=  router;