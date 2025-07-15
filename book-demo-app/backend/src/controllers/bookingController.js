const pool = require('../config/db');
const DemoSlot = require('../models/DemoSlot');
const Booking = require('../models/Booking');
const { 
  sendInitiatedEmail,     
  sendAcceptedEmail,      
  sendRescheduleEmails    
} = require('../utils/email');

// Get slots by date
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

// Book a demo slot
exports.bookDemo = async (req, res) => {
  try {
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

    // Uncomment if you want to block multiple bookings from same IP
    if (!test && await Booking.hasBookedInLast24Hours(ip_address)) {
      return res.status(403).json({ message: 'You have already booked in the last 24 hours.' });
    }

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
      guests: guestArray.join(','),
      ip_address
    });

    await DemoSlot.bookSlot(slot_id);

    try {
      // Send "Demo Request Initiated" email
      await sendInitiatedEmail({
        slot,
        first_name: first_name.trim(),
        last_name: last_name.trim(),
        company_name: company_name.trim(),
        mobile_number: mobile_number.trim(),
        email: email.trim(),
        description: description.trim(),
        guests: guestArray.join(',')
      });
    } catch (emailErr) {
      console.error('Booking was successful but failed to send initiated email:', emailErr);
    }

    res.json({ message: 'Booking successful' });
  } catch (err) {
    console.error('Booking error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Bulk create slots
exports.bulkCreateSlots = async (req, res) => {
  try {
    const { daysConfig } = req.body;
    if (!Array.isArray(daysConfig) || daysConfig.length === 0) {
      return res.status(400).json({ message: "No daysConfig provided." });
    }

    for (const dayObj of daysConfig) {
      const { day, slots } = dayObj;
      if (!day || !Array.isArray(slots) || slots.length === 0) continue;

      // 1. Find all future slots for this day_of_week
      const [existingSlots] = await pool.query(
        'SELECT id FROM demo_slots WHERE day_of_week = ? AND date >= CURDATE()',
        [day]
      );

      // 2. Delete only those slots that have no bookings
      for (const slot of existingSlots) {
        const [bookings] = await pool.query(
          'SELECT id FROM bookings WHERE slot_id = ?',
          [slot.id]
        );
        if (bookings.length === 0) {
          await pool.query('DELETE FROM demo_slots WHERE id = ?', [slot.id]);
        }
      }

      // 3. Insert new slots
      if (slots.length > 0) {
        const values = slots.map(({ date, start_time, end_time }) => [date, start_time, end_time, 0, day, 'active']);
        await pool.query(
          'INSERT INTO demo_slots (date, start_time, end_time, is_booked, day_of_week, day_status) VALUES ?',
          [values]
        );
      }
    }

    res.json({ message: "Slots updated successfully for selected days." });
  } catch (err) {
    res.status(500).json({ message: "Failed to create slots", error: err.message });
  }
};