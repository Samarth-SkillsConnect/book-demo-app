// const pool = require('../config/db');

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

// exports.createSlot = async (req, res) => {
//   const { date, start_time, end_time, max_attendees } = req.body;
//   if (!date || !start_time || !end_time || !max_attendees) {
//     return res.status(400).json({ message: 'Missing required fields' });
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

// exports.deleteSlot = async (req, res) => {
//   const { id } = req.params;
//   try {
//     await pool.query(`DELETE FROM demo_slots WHERE id = ?`, [id]);
//     res.json({ message: 'Slot deleted' });
//   } catch (err) {
//     res.status(500).json({ message: 'Error deleting slot', error: err.message });
//   }
// };

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


// // Accept booking and set meet_link
// exports.acceptBooking = async (req, res) => {
//   const { id } = req.params;
//   const { meet_link } = req.body;
//   try {
//     await pool.query(
//       "UPDATE bookings SET status = 'accepted', meet_link = ? WHERE id = ?",
//       [meet_link, id]
//     );
//     res.json({ message: "Booking accepted" });
//   } catch (err) {
//     res.status(500).json({ message: "Error accepting booking", error: err.message });
//   }
// };

// // Reject booking
// exports.rejectBooking = async (req, res) => {
//   const { id } = req.params;
//   try {
//     await pool.query(
//       "UPDATE bookings SET status = 'rejected', meet_link = NULL WHERE id = ?",
//       [id]
//     );
//     res.json({ message: "Booking rejected" });
//   } catch (err) {
//     res.status(500).json({ message: "Error rejecting booking", error: err.message });
//   }
// };

// // Optionally: update meet link for accepted booking
// exports.setBookingMeetLink = async (req, res) => {
//   const { id } = req.params;
//   const { meet_link } = req.body;
//   try {
//     await pool.query(
//       "UPDATE bookings SET meet_link = ? WHERE id = ? AND status = 'accepted'",
//       [meet_link, id]
//     );
//     res.json({ message: "Meet link updated" });
//   } catch (err) {
//     res.status(500).json({ message: "Error updating meet link", error: err.message });
//   }
// };

// exports.getAllBookings = async (req, res) => {
//   try {
//     // Optionally join with slots for slot info
//     const [bookings] = await pool.query(`
//       SELECT b.*, s.date, s.start_time, s.end_time
//       FROM bookings b
//       LEFT JOIN demo_slots s ON b.slot_id = s.id
//       ORDER BY b.created_at DESC
//     `);
//     res.json(bookings);
//   } catch (err) {
//     res.status(500).json({ message: 'Error fetching bookings', error: err.message });
//   }
// };

























// const pool = require('../config/db');

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

// exports.createSlot = async (req, res) => {
//   const { date, start_time, end_time, max_attendees } = req.body;
//   if (!date || !start_time || !end_time || !max_attendees) {
//     return res.status(400).json({ message: 'Missing required fields' });
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

// exports.deleteSlot = async (req, res) => {
//   const { id } = req.params;
//   try {
//     await pool.query(`DELETE FROM demo_slots WHERE id = ?`, [id]);
//     res.json({ message: 'Slot deleted' });
//   } catch (err) {
//     res.status(500).json({ message: 'Error deleting slot', error: err.message });
//   }
// };

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


// // Accept booking and set meet_link
// exports.acceptBooking = async (req, res) => {
//   const { id } = req.params;
//   const { meet_link } = req.body;
//   try {
//     await pool.query(
//       "UPDATE bookings SET status = 'accepted', meet_link = ? WHERE id = ?",
//       [meet_link, id]
//     );
//     res.json({ message: "Booking accepted" });
//   } catch (err) {
//     res.status(500).json({ message: "Error accepting booking", error: err.message });
//   }
// };

// // Reject booking
// exports.rejectBooking = async (req, res) => {
//   const { id } = req.params;
//   try {
//     await pool.query(
//       "UPDATE bookings SET status = 'rejected', meet_link = NULL WHERE id = ?",
//       [id]
//     );
//     res.json({ message: "Booking rejected" });
//   } catch (err) {
//     res.status(500).json({ message: "Error rejecting booking", error: err.message });
//   }
// };

// // Optionally: update meet link for accepted booking
// exports.setBookingMeetLink = async (req, res) => {
//   const { id } = req.params;
//   const { meet_link } = req.body;
//   try {
//     await pool.query(
//       "UPDATE bookings SET meet_link = ? WHERE id = ? AND status = 'accepted'",
//       [meet_link, id]
//     );
//     res.json({ message: "Meet link updated" });
//   } catch (err) {
//     res.status(500).json({ message: "Error updating meet link", error: err.message });
//   }
// };

// exports.getAllBookings = async (req, res) => {
//   try {
//     // Optionally join with slots for slot info
//     const [bookings] = await pool.query(`
//       SELECT b.*, s.date, s.start_time, s.end_time
//       FROM bookings b
//       LEFT JOIN demo_slots s ON b.slot_id = s.id
//       ORDER BY b.created_at DESC
//     `);
//     res.json(bookings);
//   } catch (err) {
//     res.status(500).json({ message: 'Error fetching bookings', error: err.message });
//   }
// };




const pool = require('../config/db');

// Helper: Map 'mon'...'sun' to 1...7 (ISO weekday, Sunday=7)
const weekdayMap = {
  mon: 1,
  tue: 2,
  wed: 3,
  thu: 4,
  fri: 5,
  sat: 6,
  sun: 7,
};

function timeToMinutes(t) {
  const [h, m] = t.split(':').map(Number);
  return h * 60 + m;
}
function minutesToTime(m) {
  const h = String(Math.floor(m / 60)).padStart(2, '0');
  const min = String(m % 60).padStart(2, '0');
  return `${h}:${min}`;
}
// Generates slots for a single date
function generateSlotsForDate(date, start, end, interval) {
  const slots = [];
  let cur = timeToMinutes(start);
  const endMins = timeToMinutes(end);
  while (cur + interval <= endMins) {
    const slotStart = minutesToTime(cur);
    const slotEnd = minutesToTime(cur + interval);
    slots.push({ date, start_time: slotStart, end_time: slotEnd });
    cur += interval;
  }
  return slots;
}

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

/**
 * POST /slots/bulk-generate
 * Body: {
 *   days: ["mon", "wed", "fri"], // array of weekdays (string)
 *   start: "09:00",
 *   end: "18:30",
 *   interval: 30,
 *   max_attendees: 10
 * }
 */
exports.bulkCreateSlots = async (req, res) => {
  try {
    const { days, start, end, interval, max_attendees } = req.body;
    if (!days || !Array.isArray(days) || !start || !end || !interval || !max_attendees) {
      return res.status(400).json({ message: 'Missing required fields.' });
    }

    const today = new Date();
    const endDate = new Date(today);
    endDate.setMonth(today.getMonth() + 6);

    let createdCount = 0, skippedCount = 0;

    for (let d = new Date(today); d <= endDate; d.setDate(d.getDate() + 1)) {
      const weekday = d.getDay() === 0 ? 7 : d.getDay(); // Sunday=7
      for (const dayKey of days) {
        if (weekday === weekdayMap[dayKey]) {
          const dateStr = d.toISOString().slice(0, 10);
          const slots = generateSlotsForDate(dateStr, start, end, interval);

          for (const slot of slots) {
            // Avoid exact duplicates (date, start_time, end_time)
            const [rows] = await pool.query(
              `SELECT id FROM demo_slots WHERE date = ? AND start_time = ? AND end_time = ?`,
              [slot.date, slot.start_time, slot.end_time]
            );
            if (rows.length === 0) {
              await pool.query(
                `INSERT INTO demo_slots (date, start_time, end_time, max_attendees, is_booked) VALUES (?, ?, ?, ?, 0)`,
                [slot.date, slot.start_time, slot.end_time, max_attendees]
              );
              createdCount++;
            } else {
              skippedCount++;
            }
          }
        }
      }
    }

    res.json({
      message: `Created ${createdCount} slots. Skipped ${skippedCount} duplicates.`,
    });
  } catch (err) {
    console.error('Error in bulkCreateSlots:', err);
    res.status(500).json({ message: 'Error generating slots.' });
  }
};

/**
 * POST /slots/custom
 * Body: {
 *   date: "2025-07-12",
 *   start: "10:00",
 *   end: "12:00",
 *   max_attendees: 10,
 *   openClose: "open"|"close"
 * }
 * If openClose === "open", create the slot for the date.
 * If openClose === "close", delete all slots for the date (or mark as inactive).
 */
exports.createOrCloseCustomSlot = async (req, res) => {
  try {
    const { date, start, end, max_attendees, openClose } = req.body;
    if (!date || !openClose) {
      return res.status(400).json({ message: 'Missing required fields.' });
    }
    if (openClose === "open") {
      if (!start || !end || !max_attendees) {
        return res.status(400).json({ message: 'Missing required fields for open slot.' });
      }
      // Avoid duplicates
      const [rows] = await pool.query(
        `SELECT id FROM demo_slots WHERE date = ? AND start_time = ? AND end_time = ?`,
        [date, start, end]
      );
      if (rows.length === 0) {
        await pool.query(
          `INSERT INTO demo_slots (date, start_time, end_time, max_attendees, is_booked) VALUES (?, ?, ?, ?, 0)`,
          [date, start, end, max_attendees]
        );
        res.json({ message: "Custom slot created." });
      } else {
        res.json({ message: "Slot already exists for this date/time." });
      }
    } else if (openClose === "close") {
      // Remove all slots for this date
      await pool.query(
        `DELETE FROM demo_slots WHERE date = ?`,
        [date]
      );
      res.json({ message: "Slots for this date have been closed/removed." });
    }
  } catch (err) {
    console.error('Error in createOrCloseCustomSlot:', err);
    res.status(500).json({ message: 'Error handling custom slot.' });
  }
};