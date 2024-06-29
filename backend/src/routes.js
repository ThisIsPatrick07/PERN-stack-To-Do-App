const { Router } = require('express');
const controller = require('./controller.js');

const router = Router();

// display all tasks
router.get('/', controller.getTasks);

// display task by ID
router.get('/:id', controller.getTaskById);

// add task
router.post('/', controller.addTask);

// delete task
router.delete('/:id', controller.removeTask);

router.put('/:id', controller.updateTask);

module.exports = router;