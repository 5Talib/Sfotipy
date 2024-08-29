const express = require("express");
const router = express.Router();
const {register,login,users} = require("../controllers/auth");

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/users").get(users);

module.exports = router;