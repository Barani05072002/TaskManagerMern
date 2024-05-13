const express = require('express')
const {createTask,getAllTask, getSingleTask, updateTask, deleteTask} = require('../controller/taskController')

const router = express.Router();
router.post('/',createTask);
router.get('/',getAllTask);
router.get('/:id',getSingleTask);
router.patch('/:id',updateTask);
router.delete('/:id',deleteTask);

module.exports = router;