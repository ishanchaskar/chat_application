const express = require('express');
const router = express.Router();
const {registerUser } = require("../controller/userController") 

router.post('/',registerUser)
router.post("/login" , function(req, res) {})

module.exports =router
