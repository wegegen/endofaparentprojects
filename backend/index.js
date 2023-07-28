const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000; // You can change this port if needed

// Create a connection to the MySQL database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Replace with your MySQL username  

  password: '', // Replace with your MySQL password
  database: 'myfile', // Replace with your database name
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Connected to MySQL database!');
  }
});

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Save data to MySQL database
app.post('/api/saveData', (req, res) => {
  const { tables } = req.body;

  if (!Array.isArray(tables)) {
    return res.status(400).json({ error: 'Invalid data format. Expecting an array of tables.' });
  }

  // Assuming you have a table named 'myfiletable' in the database
  const tableName = 'myfiletable';

  // Truncate the table to clear existing data (you may skip this if you want to keep existing data)
  db.query(`TRUNCATE TABLE ${tableName}`, (truncateErr) => {
    if (truncateErr) {
      console.error('Error truncating the table:', truncateErr);
      return res.status(500).json({ error: 'An error occurred while truncating the table.' });
    }

    // Insert new data into the table
    const insertQuery = `INSERT INTO ${tableName} (file_name, table_data) VALUES ?`;

    const values = tables.map((table) => [table.fileName, JSON.stringify(table)]);
    db.query(insertQuery, [values], (insertErr, results) => {
      if (insertErr) {
        console.error('Error inserting data into the table:', insertErr);
        return res.status(500).json({ error: 'An error occurred while inserting data into the table.' });
      }

      return res.json({ message: 'Data saved successfully!' });
    });
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
