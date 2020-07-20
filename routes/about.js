const express = require("express");
const router = express.Router();
const AboutController = require("../controllers/AboutController");
const upload = require("../middlewares/fileUpload");

router.post("/add",upload, AboutController.addAbout);
router.get("/",AboutController.getAbout)
router.put("/:id",upload, AboutController.updateAbout);
module.exports = router;
