const express = require('express');
const router = express.Router();
const {registerUser , authUser , allUsers } = require("../controller/userController") 

router.post('/',registerUser)
router.post("/login" , authUser)
router.get("/" , allUsers)
// router.get("/",allUsers)

module.exports =router
