const express = require('express');

const dotenv = require('dotenv');
dotenv.config();

const app = express();

const mysql = require('mysql');
const connection = mysql.createConnection({
  host: process.env.DB_SERVER_IP,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

connection.connect();

connection.query('SELECT * FROM roster', function(error, results, fields) {
  if (error) {
    console.log(error);
  }
  console.log(results);
});

connection.end();

app.listen(5000, () => {
  console.log('serving running on port 5000');
});
