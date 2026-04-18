const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

router.get('/:user_id', taskController.getTasks);
router.post('/', taskController.addTask);
router.put('/:task_id', taskController.completeTask);
router.delete('/:task_id', taskController.deleteTask);

module.exports = router;