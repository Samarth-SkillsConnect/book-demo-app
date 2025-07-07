const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST || 'localhost',
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || '',
  database: process.env.MYSQL_DATABASE || 'demo_booking',
  waitForConnections: true,
    dateStrings: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;