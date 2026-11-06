
'use strict';

const Employee = require('../models/employee.model');

// GET all employees
exports.findAll = (req, res) => {
    Employee.findAll((err, data) => {
        if (err) {
            return res.status(500).json({
                message: err.message
            });
        }

        res.status(200).json(data);
    });
};

// GET employee by ID
exports.findById = (req, res) => {
    Employee.findById(req.params.id, (err, data) => {
        if (err) {
            return res.status(500).json({
                message: err.message
            });
        }

        if (data.length === 0) {
            return res.status(404).json({
                message: 'Employee not found.'
            });
        }

        res.status(200).json(data[0]);
    });
};

// CREATE employee
exports.create = (req, res) => {
    if (!req.body) {
        return res.status(400).json({
            message: 'Request body cannot be empty.'
        });
    }

    const newEmployee = new Employee(req.body);

    Employee.create(newEmployee, (err, data) => {
        if (err) {
            return res.status(500).json({
                message: err.message
            });
        }

        res.status(201).json(data);
    });
};

// UPDATE employee
exports.update = (req, res) => {
    Employee.updateById(
        req.params.id,
        req.body,
        (err, data) => {
            if (err) {
                return res.status(500).json({
                    message: err.message
                });
            }

            if (data.affectedRows === 0) {
                return res.status(404).json({
                    message: 'Employee not found.'
                });
            }

            res.status(200).json({
                message: 'Employee updated successfully.'
            });
        }
    );
};

// DELETE employee
exports.delete = (req, res) => {
    Employee.deleteById(req.params.id, (err, data) => {
        if (err) {
            return res.status(500).json({
                message: err.message
            });
        }

        if (data.affectedRows === 0) {
            return res.status(404).json({
                message: 'Employee not found.'
            });
        }

        res.status(200).json({
            message: 'Employee deleted successfully.'
        });
    });
};
