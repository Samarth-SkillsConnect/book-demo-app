// const express = require('express');
// const router = express.Router();
// const pool = require('../config/db');

// router.get('/available-dates', async (req, res) => {
//   try {
//     const [rows] = await pool.query(
//       'SELECT DISTINCT date FROM demo_slots WHERE is_booked = 0'
//     );
   
//     const dates = rows.map(row => String(row.date));
//     res.json(dates);
//   } catch (err) {
//     console.error('Error in /available-dates:', err);
//     res.status(500).json({ message: 'Error fetching available dates.' });
//   }
// });

// module.exports = router;


const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// GET /demo-slots/available-dates
router.get('/available-dates', async (req, res) => {
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

// GET /demo-slots?date=YYYY-MM-DD
router.get('/', async (req, res) => {
  const { date } = req.query;
  if (!date) {
    return res.status(400).json({ message: 'Missing date parameter.' });
  }
  try {
    const [rows] = await pool.query(
      'SELECT * FROM demo_slots WHERE date = ? ORDER BY start_time',
      [date]
    );
    res.json(rows);
  } catch (err) {
    console.error('Error in GET /demo-slots:', err);
    res.status(500).json({ message: 'Error fetching slots for date.' });
  }
});

module.exports = router;