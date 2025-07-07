const express = require('express');
const router = express.Router();
const pool = require('../config/db');

router.get('/available-dates', async (res) => {
  try {
    const [rows] = await pool.query(
      'SELECT DISTINCT date FROM demo_slots WHERE is_booked = 0'
    );
   
    const dates = rows.map(row => String(row.date));
    res.json(dates);
  } catch (err) {
    console.error('Error in /available-dates:', err);
    res.status(500).json({ message: 'Error fetching available dates.' });
  }
});

module.exports = router;