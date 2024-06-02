const express = require('express');
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { registerUser, authUser, allUsers } = require("../controller/userController");
const { accessChat } = require("../controller/chatController");

router.post('/', registerUser);
router.post("/login", authUser);
router.get("/", protect, allUsers);
// router.post("/chat", protect, accessChat);

module.exports = router;
