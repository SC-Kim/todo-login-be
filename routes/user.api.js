const express = require('express');
const router = express.Router()
const userContoller = require("../controller/user.controller");
const authController = require('../controller/auth.contoller');

// 회원가입 endpoint 

// router.get("/", (req, res) => {
//     res.send("create user controller will be here")
// })

router.post("/", userContoller.createUser)
router.post("/login", userContoller.loginWithEmail)

router.get("/me", authController.authenticate, userContoller.getUser)
module.exports = router;
