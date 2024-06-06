const express = require('express');
const {protect} = require("../middleware/authMiddleware")
const router = express.Router();
const {accessChat , fetchChats , createGroupChat , renameGroupChat , addtoGroup ,removeFromGroup} = require("../controller/chatController")
router.post("/" , protect , accessChat)
router.get("/" , protect , fetchChats)
router.post("/group" , protect , createGroupChat)
router.put("/rename" , protect , renameGroupChat)
router.put("/groupadd" , protect , addtoGroup)
router.put("/groupremove" , protect , removeFromGroup)


module.exports = router;