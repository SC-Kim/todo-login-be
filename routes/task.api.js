const express = require('express')
const taskController = require('../controller/task.controller')
const router = express.Router()
const authController = require("../controller/auth.contoller")

router.post('/', authController.authenticate, taskController.createTask)

router.get('/', taskController.getTask)

router.put('/:id', taskController.updateTask)

router.delete('/:id', taskController.deleteTask)

module.exports = router;