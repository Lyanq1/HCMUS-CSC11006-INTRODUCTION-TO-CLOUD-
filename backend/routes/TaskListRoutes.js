const express = require('express');
const { createTaskList, getTaskList, deleteTaskList, updateTaskList } = require('../controllers/TaskListController');
const router = express.Router();

router.post('/create-task', createTaskList);
router.get('/get-task/:id', getTaskList);
router.delete('/delete-task/:id', deleteTaskList);
router.patch('/update-task/:id', updateTaskList);

module.exports = router;