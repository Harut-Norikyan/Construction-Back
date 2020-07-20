const express = require('express');
const projects = require('./projects');
const users = require('./users');
const about = require('./about');
const contacts = require('./contacts');
const router = express.Router();


router.use('/projects', projects);
router.use('/users', users);
router.use('/about', about);
router.use('/contacts', contacts);

module.exports = router;
