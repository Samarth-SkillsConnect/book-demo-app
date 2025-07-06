const express = require('express');
const router = express.Router();
const pool = require('../config/db'); // Adjust if your db config is elsewhere

// Example: other demoSlots routes can be here

// Endpoint: GET /api/demo-slots/available-dates
router.get('/available-dates', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT DISTINCT date FROM demo_slots WHERE is_booked = 0'
    );
    const dates = rows.map(row =>
      row.date instanceof Date
        ? row.date.toISOString().slice(0, 10)
        : row.date
    );
    res.json(dates);
  } catch (err) {
    console.error('Error in /available-dates:', err);
    res.status(500).json({ message: 'Error fetching available dates.' });
  }
});

module.exports = router;