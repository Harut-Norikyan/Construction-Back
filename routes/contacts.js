const express = require("express");
const router = express.Router();
const ContactController = require("../controllers/ContactController");

router.post("/add", ContactController.addContact);
router.get("/",ContactController.getContact)
router.put("/:id", ContactController.updateContact);
module.exports = router;
