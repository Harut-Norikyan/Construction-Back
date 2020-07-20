const express = require('express');
const ProjectController = require('../controllers/ProjectController');
const router = express.Router();
const upload = require("../middlewares/fileUpload");



router.get("/:page",ProjectController.getProjects)
router.get("/projectById/:id",ProjectController.getProjectById)
router.post("/",upload,ProjectController.addProject)
router.put("/:id",upload,ProjectController.updateProject)
router.delete("/:id",ProjectController.deleteProject)



module.exports = router;


