var cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());

const PORT = process.env.PORT || 3000;

// Parse incoming requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Root route
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Employee routes
const employeeRoutes = require('./src/routes/employee.routes');

app.use('/api/v1/employees', employeeRoutes);

// Start server ONCE
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

/*
var cors = require('cors');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());

// Setup Server Port
const PORT = process.env.PORT || 3000;

// Parse Requests of Content Type - application/x-www-form-urlencoded & application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Define Root Route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Listen for Requests
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


// Require Employee Routes


const employeeRoutes = require('./src/routes/employee.routes');

app.use('/api/employees', employeeRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
}); 


// How to run: use node index.js or node index 

// How to run with nodemon: use nodemon index.js or nodemon index

/* 

TO DO
1. XAMPP: Apache & MySQL must be running
2. PHPMyAdmin: Create a database called "testdb" and a table called "users" with the following structure:
*/