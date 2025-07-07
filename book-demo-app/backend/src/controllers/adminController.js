// const pool = require('../config/db');

// // Get all slots with booking counts
// exports.getAllSlots = async (req, res) => {
//   try {
//     const [slots] = await pool.query(`
//       SELECT s.*, 
//              (SELECT COUNT(*) FROM bookings b WHERE b.slot_id = s.id) as bookings_count
//       FROM demo_slots s
//       ORDER BY s.date DESC, s.start_time ASC
//     `);
//     res.json(slots);
//   } catch (err) {
//     res.status(500).json({ message: 'Error fetching slots', error: err.message });
//   }
// };

// // Create a new slot
// exports.createSlot = async (req, res) => {
//   const { date, start_time, end_time, max_attendees } = req.body;
//   if (!date || !start_time || !end_time || !max_attendees) {
//     return res.status(400).json({ message: 'Missing required fields' });
//   }
//    if (start_time < '09:00' || end_time > '18:00') {
//     return res.status(400).json({ message: 'Slots must be between 09:00 and 18:00 IST.' });
//   }

//   try {
//     const [result] = await pool.query(
//       `INSERT INTO demo_slots (date, start_time, end_time, max_attendees, is_booked) VALUES (?, ?, ?, ?, 0)`,
//       [date, start_time, end_time, max_attendees]
//     );
//     res.status(201).json({ id: result.insertId });
//   } catch (err) {
//     res.status(500).json({ message: 'Error creating slot', error: err.message });
//   }
// };

// // Delete a slot
// exports.deleteSlot = async (req, res) => {
//   const { id } = req.params;
//   try {
//     await pool.query(`DELETE FROM demo_slots WHERE id = ?`, [id]);
//     res.json({ message: 'Slot deleted' });
//   } catch (err) {
//     res.status(500).json({ message: 'Error deleting slot', error: err.message });
//   }
// };

// // Get all bookings for a slot
// exports.getBookingsForSlot = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const [bookings] = await pool.query(
//       `SELECT * FROM bookings WHERE slot_id = ? ORDER BY created_at DESC`,
//       [id]
//     );
//     res.json(bookings);
//   } catch (err) {
//     res.status(500).json({ message: 'Error fetching bookings', error: err.message });
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
  // Removed 09:00-18:00 restriction for admin slot creation
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