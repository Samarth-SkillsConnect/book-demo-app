const pool = require('../config/db');

const DemoSlot = {
  async getSlotsByDate(date) {
    const [rows] = await pool.query('SELECT * FROM demo_slots WHERE date = ? AND is_booked = 0', [date]);
    return rows;
  },
  async getSlotById(id) {
    const [rows] = await pool.query('SELECT * FROM demo_slots WHERE id = ?', [id]);
    return rows[0];
  },
  async bookSlot(id) {
    await pool.query('UPDATE demo_slots SET is_booked = 1 WHERE id = ?', [id]);
  },
  async createSlot(date, startTime, endTime) {
    const [res] = await pool.query(
      'INSERT INTO demo_slots (date, start_time, end_time) VALUES (?, ?, ?)',
      [date, startTime, endTime]
    );
    return res.insertId;
  }
};

module.exports = DemoSlot;