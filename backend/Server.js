// // server.js
// const express = require('express');
// const mysql = require('mysql');
// const app = express();
// const cors = require('cors');
// app.use(cors());

// const port = 3000; // You can use any port number you prefer

// // Create a MySQL connection
// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root', // Replace 'root' with your MySQL username
//   password: '', // Replace with your MySQL password
//   database: 'planandreports', // Replace 'mydb' with your database name
// });

// // Connect to MySQL
// connection.connect((err) => {
//   if (err) {
//     console.error('Error connecting to MySQL database:', err);
//     return;
//   }
//   console.log('Connected to MySQL database!');
// });

// // Middleware to parse JSON requests
// app.use(express.json());

// // Endpoint to save the table data to the database
// app.post('/api/save-table', (req, res) => {
//   const { fileName, id, columns, rows } = req.body;

//   // Prepare the data for insertion into the database
//   const tableData = {
//     fileName: fileName,
//     tableId: id,
//     columns: JSON.stringify(columns),
//     rows: JSON.stringify(rows),
//   };

//   // Insert the table data into the database
//   connection.query('INSERT INTO myfiletable SET ?', tableData, (err, result) => {
//     if (err) {
//       console.error('Error saving table to database:', err);
//       res.status(500).json({ message: 'Error saving table to database' });
//     } else {
//       console.log('Table data saved to database!');
//       res.json({ message: 'Table data saved to database' });
//     }
//   });
// });

// // app.post('/api/save-table', (req, res) => {
// //   const { fileName, id, columns, rows } = req.body;

// //   // Prepare the data for insertion into the database
// //   const tableData = {
// //     fileName: fileName,
// //     tableId: id,
// //     columns: JSON.stringify(columns), // Serialize columns to JSON
// //     rows: JSON.stringify(rows), // Serialize rows to JSON
// //   };

// //   // Insert the table data into the database
// //   connection.query('INSERT INTO myfiletable SET ?', tableData, (err, result) => {
// //     if (err) {
// //       console.error('Error saving table to database:', err);
// //       res.status(500).json({ message: 'Error saving table to database' });
// //     } else {
// //       console.log('Table data saved to database!');
// //       res.json({ message: 'Table data saved to database' });
// //     }
// //   });
// // });

// // Endpoint to get all table data from the database
// app.get('/api/get-tables', (req, res) => {
//   // Your logic to fetch the table data from the database goes here
//   // For example:
//   connection.query('SELECT * FROM myfiletable', (err, result) => {
//     if (err) {
//       console.error('Error fetching table data:', err);
//       res.status(500).json({ message: 'Error fetching table data' });
//     } else {
//       res.json(result);
//     }
//   });
// });


// // Start the server
// app.listen(port, () => {
//   console.log(`Server running on http://localhost:${port}`);
// });
// server.js
const express = require('express');
const mysql = require('mysql');
const app = express();
const cors = require('cors');
app.use(cors());

const port = 3000; // You can use any port number you prefer

// Create a MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Replace 'root' with your MySQL username
  password: '', // Replace with your MySQL password
  database: 'planandreports', // Replace 'mydb' with your database name
});

// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    return;
  }
  console.log('Connected to MySQL database!');
});

// Middleware to parse JSON requests
app.use(express.json());

// Endpoint to save multiple table data to the database
app.post('/api/save-tables', (req, res) => {
  const tables = req.body; // Array of tables received in the request

  // Save each table to the database
  tables.forEach((table) => {
    const { fileName, id, columns, rows } = table;

    // Prepare the data for insertion into the database
    const tableData = {
      fileName: fileName,
      tableId: id,
      columns: JSON.stringify(columns),
      rows: JSON.stringify(rows),
    };

    // Insert the table data into the database
    connection.query('INSERT INTO myfiletable SET ?', tableData, (err, result) => {
      if (err) {
        console.error('Error saving table to database:', err);
        res.status(500).json({ message: 'Error saving table to database' });
        return;
      }
      console.log(`Table ${id} data saved to database!`);
    });
  });

  res.json({ message: 'Tables data saved to database' });
});

// Endpoint to get all table data from the database
app.get('/api/get-tables', (req, res) => {
  // Your logic to fetch the table data from the database goes here
  // For example:
  connection.query('SELECT * FROM myfiletable', (err, result) => {
    if (err) {
      console.error('Error fetching table data:', err);
      res.status(500).json({ message: 'Error fetching table data' });
    } else {
      res.json(result);
    }
  });
});



// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
