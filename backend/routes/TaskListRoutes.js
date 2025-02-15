const express = require('express');
const { createTaskList } = require('../controllers/TaskListController');
const router = express.Router();

router.post('/create-task', createTaskList);

module.exports = router;