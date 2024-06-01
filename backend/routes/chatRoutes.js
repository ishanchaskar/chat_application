const express = require('express');
const {protect} = require("../middleware/authMiddleware")
const router = express.Router();
const {accessChat} = require("../controller/chatController")
router.post("/" , protect , accessChat)
// router.get("/" , protect , fetchChats)
// router.post("/group" , protect , createGroupChat)
// router.put("/rename" , protect , renameGroupChat)
// router.put("/groupremove" , protect , removeFromGroup)
// router.put("/groupadd" , protect , addtoGroup)


module.exports =router
