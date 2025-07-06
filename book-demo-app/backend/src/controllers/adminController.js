// const DemoSlot = require('../models/DemoSlot');

// exports.createSlot = async (req, res) => {
//   try {
//     const { date, start_time, end_time } = req.body;
//     if (!date || !start_time || !end_time) {
//       return res.status(400).json({ message: 'Missing fields' });
//     }
//     const slotId = await DemoSlot.createSlot(date, start_time, end_time);
//     res.json({ slotId });
//   } catch (err) {
//     res.status(500).json({ message: 'Server error' });
//   }
// };


const pool = require('../config/db');

// Get all slots with booking counts
exports.getAllSlots = async (req, res) => {
  try {
    const [slots] = await pool.query(`
      SELECT s.*, 
             (SELECT COUNT(*) FROM bookings b WHERE b.slot_id = s.id) as bookings_count
      FROM demo_slots s
      ORDER BY s.date DESC, s.start_time ASC
    `);
    res.json(slots);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching slots', error: err.message });
  }
};

// Create a new slot
exports.createSlot = async (req, res) => {
  const { date, start_time, end_time, max_attendees } = req.body;
  if (!date || !start_time || !end_time || !max_attendees) {
    return res.status(400).json({ message: 'Missing required fields' });
  }
  try {
    const [result] = await pool.query(
      `INSERT INTO demo_slots (date, start_time, end_time, max_attendees, is_booked) VALUES (?, ?, ?, ?, 0)`,
      [date, start_time, end_time, max_attendees]
    );
    res.status(201).json({ id: result.insertId });
  } catch (err) {
    res.status(500).json({ message: 'Error creating slot', error: err.message });
  }
};

// Delete a slot
exports.deleteSlot = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query(`DELETE FROM demo_slots WHERE id = ?`, [id]);
    res.json({ message: 'Slot deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting slot', error: err.message });
  }
};

// Get all bookings for a slot
exports.getBookingsForSlot = async (req, res) => {
  const { id } = req.params;
  try {
    const [bookings] = await pool.query(
      `SELECT * FROM bookings WHERE slot_id = ? ORDER BY created_at DESC`,
      [id]
    );
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching bookings', error: err.message });
  }
};