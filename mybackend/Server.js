// const express = require('express');
// const bodyParser = require('body-parser');
// const mysql = require('mysql');

// const app = express();
// const PORT = 5000; // Change this to the desired port number

// // Middleware
// app.use(bodyParser.json());

// // MySQL Configuration
// const dbConfig = {
//   host: 'localhost', // Replace with your MySQL server hostname
//   user: 'root', // Replace with your MySQL username
//   password: '', // Replace with your MySQL password
//   database: 'planandreports', // Replace with your database name 'myfile'
// };

// // Create a MySQL pool to handle database connections
// const pool = mysql.createPool(dbConfig);

// // Create the table in MySQL database if it doesn't exist
// const createTableQuery = `
//   CREATE TABLE IF NOT EXISTS myfiletable (
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     fileName VARCHAR(255),
//     tableData JSON
//   )
// `;

// pool.query(createTableQuery, (err) => {
//   if (err) {
//     console.error('Error creating table:', err);
//   } else {
//     console.log('Table created successfully!');
//   }
// });

// // Save the table data to the MySQL database
// app.post('/api/saveTable', (req, res) => {
//   const { fileName, tableData } = req.body;

//   if (!fileName || !tableData) {
//     return res.status(400).json({ error: 'Both fileName and tableData are required' });
//   }

//   const insertQuery = 'INSERT INTO myfiletable (fileName, tableData) VALUES (?, ?)';

//   pool.query(insertQuery, [fileName, JSON.stringify(tableData)], (err) => {
//     if (err) {
//       console.error('Error saving data to the database:', err);
//       return res.status(500).json({ error: 'Error saving data to the database' });
//     }

//     return res.status(200).json({ success: true });
//   });
// });

// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server started on http://localhost:${PORT}`);
// });
import React from 'react'

function Server() {
  return (
    <div>Server</div>
  )
}

export default Server