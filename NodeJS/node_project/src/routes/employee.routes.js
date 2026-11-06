const express = require('express');
const router = express.Router();

const employeeController = require('../controllers/employee.controller');

// GET all employees
router.get('/', employeeController.findAll);

// GET one employee
router.get('/:id', employeeController.findById);

// CREATE employee
router.post('/', employeeController.create);

// UPDATE employee
router.put('/:id', employeeController.update);

// DELETE employee
router.delete('/:id', employeeController.delete);

module.exports = router;