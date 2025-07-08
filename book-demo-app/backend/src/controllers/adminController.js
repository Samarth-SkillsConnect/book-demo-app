const pool = require('../config/db');

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

exports.deleteSlot = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query(`DELETE FROM demo_slots WHERE id = ?`, [id]);
    res.json({ message: 'Slot deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting slot', error: err.message });
  }
};

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


// Accept booking and set meet_link
exports.acceptBooking = async (req, res) => {
  const { id } = req.params;
  const { meet_link } = req.body;
  try {
    await pool.query(
      "UPDATE bookings SET status = 'accepted', meet_link = ? WHERE id = ?",
      [meet_link, id]
    );
    res.json({ message: "Booking accepted" });
  } catch (err) {
    res.status(500).json({ message: "Error accepting booking", error: err.message });
  }
};

// Reject booking
exports.rejectBooking = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query(
      "UPDATE bookings SET status = 'rejected', meet_link = NULL WHERE id = ?",
      [id]
    );
    res.json({ message: "Booking rejected" });
  } catch (err) {
    res.status(500).json({ message: "Error rejecting booking", error: err.message });
  }
};

// Optionally: update meet link for accepted booking
exports.setBookingMeetLink = async (req, res) => {
  const { id } = req.params;
  const { meet_link } = req.body;
  try {
    await pool.query(
      "UPDATE bookings SET meet_link = ? WHERE id = ? AND status = 'accepted'",
      [meet_link, id]
    );
    res.json({ message: "Meet link updated" });
  } catch (err) {
    res.status(500).json({ message: "Error updating meet link", error: err.message });
  }
};

exports.getAllBookings = async (req, res) => {
  try {
    // Optionally join with slots for slot info
    const [bookings] = await pool.query(`
      SELECT b.*, s.date, s.start_time, s.end_time
      FROM bookings b
      LEFT JOIN demo_slots s ON b.slot_id = s.id
      ORDER BY b.created_at DESC
    `);
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching bookings', error: err.message });
  }
};