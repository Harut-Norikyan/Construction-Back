const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");

router.post("/add", UserController.addUser);
router.post("/login", UserController.loginAdmin);
module.exports = router;
