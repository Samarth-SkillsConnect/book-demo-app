const pool = require('../config/db');
const DemoSlot = require('../models/DemoSlot');
const Booking = require('../models/Booking');
const { sendBookingEmails } = require('../utils/email');

exports.getSlotsByDate = async (req, res) => {
  try {
    const { date } = req.query;
    if (!date) return res.status(400).json({ message: 'Date is required' });

    const slots = await DemoSlot.getSlotsByDate(date);
    res.json(slots);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};



exports.bookDemo = async (req, res) => {
  try {
    // Trim all inputs
    const {
      slot_id,
      first_name = "",
      last_name = "",
      company_name = "",
      mobile_number = "",
      email = "",
      description = "",
      guests = ""
    } = req.body;

    const ip_address = req.ip;
    const test = req.query.test === 'true';

    const slot = await DemoSlot.getSlotById(slot_id);
    if (!slot || slot.is_booked) return res.status(400).json({ message: 'Slot not available' });

    // Rate limiting logic (uncomment if needed)
    // if (!test && await Booking.hasBookedInLast24Hours(ip_address)) {
    //   return res.status(403).json({ message: 'You have already booked in the last 24 hours.' });
    // }

    // Always pass guests as an array for clarity and to avoid empty/malformed emails downstream
    const guestArray = guests
      ? guests.split(',').map(g => g.trim()).filter(g => g && g.includes('@'))
      : [];

    const bookingId = await Booking.create({
      slot_id,
      first_name: first_name.trim(),
      last_name: last_name.trim(),
      company_name: company_name.trim(),
      mobile_number: mobile_number.trim(),
      email: email.trim(),
      description: description.trim(),
      guests: guestArray.join(','), // Save as comma-separated for DB
      ip_address
    });

    await DemoSlot.bookSlot(slot_id);

    // Await email sending and catch possible errors (do not crash on email failure)
    try {
      await sendBookingEmails({
        slot,
        first_name: first_name.trim(),
        last_name: last_name.trim(),
        company_name: company_name.trim(),
        mobile_number: mobile_number.trim(),
        email: email.trim(),
        description: description.trim(),
        guests: guestArray.join(',') // Now passing as array
      });
    } catch (emailErr) {
      console.error('Booking was successful but failed to send email:', emailErr);
      // Optional: still send 200, or set a warning in the response etc.
    }

    res.json({ message: 'Booking successful' });
  } catch (err) {
    console.error('Booking error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.bulkCreateSlots = async (req, res) => {
  try {
    const { slots } = req.body;
    if (!Array.isArray(slots) || slots.length === 0) {
      return res.status(400).json({ message: "No slots provided." });
    }
    const values = slots.map(({ date, start_time, end_time }) => [date, start_time, end_time, 0]);
    await pool.query(
      'INSERT INTO demo_slots (date, start_time, end_time, is_booked) VALUES ?',
      [values]
    );
    res.json({ message: "Slots created successfully!" });
  } catch (err) {
    res.status(500).json({ message: "Failed to create slots", error: err.message });
  }
};