'use strict';

const dbConn = require('../../config/db.config.js');

// Employee constructor
const Employee = function(employee) {
    this.first_name = employee.first_name;
    this.last_name = employee.last_name;
    this.email = employee.email;
    this.phone = employee.phone;
    this.organization = employee.organization;
    this.designation = employee.designation;
    this.salary = employee.salary;
    this.status = employee.status ?? 1;
    this.created_at = new Date();
    this.updated_at = new Date();
};

// GET all employees
Employee.findAll = (result) => {
    dbConn.query('SELECT * FROM employees WHERE is_deleted = 0;', (err, res) => {
        if (err) {
            console.log('SQL Error:', err);
            result(err, null);
            return;
        }

        console.log('Employees retrieved:', res);
        result(null, res);
    });
};

// GET employee by ID
Employee.findById = (id, result) => {
    dbConn.query(
        'SELECT * FROM employees WHERE id = ?',
        [id],
        (err, res) => {
            if (err) {
                result(err, null);
                return;
            }

            result(null, res);
        }
    );
};

// CREATE employee
Employee.create = (newEmployee, result) => {
    dbConn.query(
        'INSERT INTO employees SET ?',
        newEmployee,
        (err, res) => {
            if (err) {
                result(err, null);
                return;
            }

            result(null, { id: res.insertId, ...newEmployee });
        }
    );
};


// UPDATE employee
Employee.updateById = (id, employee, result) => {
    const allowedFields = [
        'first_name',
        'last_name',
        'email',
        'phone',
        'organization',
        'designation',
        'salary',
        'status'
    ];

    const updateData = {};

    allowedFields.forEach((field) => {
        if (employee[field] !== undefined) {
            updateData[field] = employee[field];
        }
    });

    if (Object.keys(updateData).length === 0) {
        return result(new Error('No valid fields provided.'), null);
    }

    updateData.updated_at = new Date();

    dbConn.query(
        'UPDATE employees SET ? WHERE id = ? AND is_deleted = 0',
        [updateData, id],
        (err, res) => {
            if (err) {
                return result(err, null);
            }

            result(null, res);
        }
    );
};

// DELETE employee (soft delete)
Employee.deleteById = (id, result) => {
    dbConn.query(
        'UPDATE employees SET is_deleted = 1 WHERE id = ? AND is_deleted = 0',
        [id],
        (err, res) => {
            if (err) {
                return result(err, null);
            }

            result(null, res);
        }
    );
};

module.exports = Employee;