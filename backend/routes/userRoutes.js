const express = require('express');
const router = express.Router();
const {protect} = require("../middleware/authMiddleware.js")
const {registerUser , authUser , allUsers } = require("../controller/userController") 

router.post('/',registerUser)
router.post("/login" , authUser)
router.get("/" , protect , allUsers)
// router.get("/",allUsers)

module.exports =router
