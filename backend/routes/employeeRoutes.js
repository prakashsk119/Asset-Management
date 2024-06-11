const express = require('express');
const router = express.Router();
const employeeController = require('../controller/employeeController');

router.post('/add', employeeController.addEmployee)
router.get('/all', employeeController.getAllEmployees)

module.exports = router
