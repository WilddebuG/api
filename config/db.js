const mysql = require('mysql2');
require('dotenv').config();

let connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
});

// connect to database
connection.connect((err) => {
    if (err) {
        throw err.message;
    }
    console.log('Connected to database');
});

module.exports = connection;