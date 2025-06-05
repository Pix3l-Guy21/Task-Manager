const express = require("express")
const router = express.Router();
const fs = require('fs');
const taskRoutes = require('./task.js')
router.use(taskRoutes)

module.exports = router;