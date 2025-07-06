// const pool = require('../config/db');

// const DemoSlot = {
//   async getSlotsByDate(date) {
//     const [rows] = await pool.query('SELECT * FROM demo_slots WHERE date = ? AND is_booked = 0', [date]);
//     return rows;
//   },
//   async getSlotById(id) {
//     const [rows] = await pool.query('SELECT * FROM demo_slots WHERE id = ?', [id]);
//     return rows[0];
//   },
//   async bookSlot(id) {
//     await pool.query('UPDATE demo_slots SET is_booked = 1 WHERE id = ?', [id]);
//   },
//   async createSlot(date, start_time, end_time) {
//     const [res] = await pool.query(
//       'INSERT INTO demo_slots (date, start_time, end_time, is_booked) VALUES (?, ?, ?, 0)',
//       [date, start_time, end_time]
//     );
//     return res.insertId;
//   }
// };

// module.exports = DemoSlot;

const pool = require('../config/db');

const DemoSlot = {
  async getSlotsByDate(date) {
    // Always select DATE(date) as `date` to ensure a plain string
    const [rows] = await pool.query(
      'SELECT id, DATE(date) as date, start_time, end_time, is_booked FROM demo_slots WHERE date = ? AND is_booked = 0',
      [date]
    );
    // Defensive: make sure date is always a string in "YYYY-MM-DD" format
    return rows.map(slot => ({
      ...slot,
      date: typeof slot.date === 'string' ? slot.date : slot.date?.toISOString?.().slice(0, 10)
    }));
  },
  async getSlotById(id) {
    const [rows] = await pool.query(
      'SELECT id, DATE(date) as date, start_time, end_time, is_booked FROM demo_slots WHERE id = ?',
      [id]
    );
    const slot = rows[0];
    if (!slot) return undefined;
    return {
      ...slot,
      date: typeof slot.date === 'string' ? slot.date : slot.date?.toISOString?.().slice(0, 10)
    };
  },
  async bookSlot(id) {
    await pool.query('UPDATE demo_slots SET is_booked = 1 WHERE id = ?', [id]);
  },
  async createSlot(date, start_time, end_time) {
    const [res] = await pool.query(
      'INSERT INTO demo_slots (date, start_time, end_time, is_booked) VALUES (?, ?, ?, 0)',
      [date, start_time, end_time]
    );
    return res.insertId;
  }
};

module.exports = DemoSlot;