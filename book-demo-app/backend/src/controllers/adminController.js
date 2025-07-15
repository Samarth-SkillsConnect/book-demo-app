const emailUtils = require('../utils/email');
const pool = require('../config/db');

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
  const { date, start_time, end_time } = req.body;
  if (!date || !start_time || !end_time) {
    return res.status(400).json({ message: 'Missing required fields' });
  }
  try {
    const [result] = await pool.query(
      `INSERT INTO demo_slots (date, start_time, end_time, is_booked) VALUES (?, ?, ?, 0)`,
      [date, start_time, end_time]
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
    // Update booking status and meet link
    await pool.query(
      "UPDATE bookings SET status = 'accepted', meet_link = ? WHERE id = ?",
      [meet_link, id]
    );

    // --- Fetch booking and slot info for email ---
    const [rows] = await pool.query(
      `SELECT b.*, s.date, s.start_time, s.end_time
       FROM bookings b
       LEFT JOIN demo_slots s ON b.slot_id = s.id
       WHERE b.id = ?`,
      [id]
    );
    if (rows.length > 0) {
      const booking = rows[0];
      const slot = {
        date: booking.date,
        start_time: booking.start_time,
        end_time: booking.end_time,
      };
      try {
        // --- Send accepted email here ---
        await emailUtils.sendAcceptedEmail({
          slot,
          first_name: booking.first_name,
          last_name: booking.last_name,
          company_name: booking.company_name,
          mobile_number: booking.mobile_number,
          email: booking.email,
          description: booking.description,
          guests: booking.guests,
          meet_link
        });
      } catch (emailErr) {
        console.error('Failed to send accepted email:', emailErr);
      }
    }

    res.json({ message: "Booking accepted" });
  } catch (err) {
    res.status(500).json({ message: "Error accepting booking", error: err.message });
  }
};

exports.rescheduleBooking = async (req, res) => {
  const { id } = req.params;
  const { date, start_time, end_time } = req.body;
  if (!date || !start_time || !end_time) {
    return res.status(400).json({ message: "Missing new date/start/end time." });
  }

  try {
    // Find current booking and slot
    const [currentBookingRows] = await pool.query(
      `SELECT slot_id FROM bookings WHERE id = ?`, [id]
    );
    const oldSlotId = currentBookingRows.length > 0 ? currentBookingRows[0].slot_id : null;

    // Find a slot that matches the new date/time
    const [slots] = await pool.query(
      `SELECT id FROM demo_slots WHERE date = ? AND start_time = ? AND end_time = ?`,
      [date, start_time, end_time]
    );

    let newSlotId;
    if (slots.length > 0) {
      newSlotId = slots[0].id;
    } else {
      // If slot does not exist, create it
      const [result] = await pool.query(
        `INSERT INTO demo_slots (date, start_time, end_time, is_booked) VALUES (?, ?, ?, 0)`,
        [date, start_time, end_time]
      );
      newSlotId = result.insertId;
    }

    // Update booking to use new slot
    await pool.query(
      `UPDATE bookings SET slot_id = ?, status = 'Accepted', meet_link = NULL WHERE id = ?`,
      [newSlotId, id]
    );

    // Mark the new slot as booked (remove it from available slots for others)
    await pool.query(
      `UPDATE demo_slots SET is_booked = 1 WHERE id = ?`,
      [newSlotId]
    );

    // Optionally: free up old slot if no other booking uses it
    if (oldSlotId) {
      const [otherBookings] = await pool.query(
        `SELECT id FROM bookings WHERE slot_id = ? AND id != ?`,
        [oldSlotId, id]
      );
      if (otherBookings.length === 0) {
        await pool.query(
          `UPDATE demo_slots SET is_booked = 0 WHERE id = ?`,
          [oldSlotId]
        );
      }
    }

    // Fetch new booking info for email
    const [bookingRows] = await pool.query(
      `SELECT b.*, s.date, s.start_time, s.end_time
       FROM bookings b
       LEFT JOIN demo_slots s ON b.slot_id = s.id
       WHERE b.id = ?`,
      [id]
    );
    if (bookingRows.length === 0) {
      return res.status(404).json({ message: "Booking not found after reschedule." });
    }
    const booking = bookingRows[0];
    const slot = {
      date: booking.date,
      start_time: booking.start_time,
      end_time: booking.end_time,
    };

    await emailUtils.sendRescheduleEmails({
      slot,
      first_name: booking.first_name,
      last_name: booking.last_name,
      company_name: booking.company_name,
      mobile_number: booking.mobile_number,
      email: booking.email,
      description: booking.description,
      guests: booking.guests
    });

    res.json({ message: "Booking rescheduled and email sent", newSlotId });
  } catch (err) {
    res.status(500).json({ message: "Error rescheduling booking", error: err.message });
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

// exports.bulkCreateSlots = async (req, res) => {
//   try {
//     const { daysConfig } = req.body;
//     if (!daysConfig || !Array.isArray(daysConfig)) {
//       return res.status(400).json({ message: 'Missing daysConfig.' });
//     }

//     const today = new Date();
//     const endDate = new Date(today);
//     endDate.setMonth(today.getMonth() + 6);

//     let createdCount = 0, skippedCount = 0, deletedCount = 0;
//     let slotsToInsert = [];
//     let slotsToDelete = [];

//     for (const config of daysConfig) {
//       const weekdayNum = weekdayMap[config.day];
//       if (!weekdayNum) continue;

//       // --- DELETE ALL FUTURE SLOTS for this day_of_week with no bookings ---
//       // Find all future slots for this day_of_week
//       const [oldSlots] = await pool.query(
//         `SELECT id FROM demo_slots WHERE day_of_week = ? AND date >= CURDATE()`,
//         [config.day]
//       );
//       for (const slot of oldSlots) {
//         const [bookings] = await pool.query(
//           `SELECT id FROM bookings WHERE slot_id = ?`,
//           [slot.id]
//         );
//         if (bookings.length === 0) {
//           await pool.query(`DELETE FROM demo_slots WHERE id = ?`, [slot.id]);
//           deletedCount++;
//         }
//       }

//       // --- Handle "weekly-off": just delete, do not create new slots ---
//       if (config.status === "weekly-off") continue;
//       if (config.status !== "active") continue;

//       // --- GENERATE AND INSERT NEW SLOTS ---
//       for (let d = new Date(today); d <= endDate; d.setDate(d.getDate() + 1)) {
//         const weekday = d.getDay() === 0 ? 7 : d.getDay();
//         if (weekday === weekdayNum) {
//           const dateStr = d.toISOString().slice(0, 10);
//           const slots = generateSlotsForDate(dateStr, config.start, config.end, Number(config.interval));
//           for (const slot of slots) {
//             // Avoid exact duplicates (date, start_time, end_time)
//             const [rows] = await pool.query(
//               `SELECT id FROM demo_slots WHERE date = ? AND start_time = ? AND end_time = ?`,
//               [slot.date, slot.start_time, slot.end_time]
//             );
//             if (rows.length === 0) {
//               await pool.query(
//                 `INSERT INTO demo_slots (date, start_time, end_time, is_booked, day_of_week, day_status, interval_minutes)
//                  VALUES (?, ?, ?, 0, ?, ?, ?)`,
//                 [slot.date, slot.start_time, slot.end_time, config.day, config.status, config.interval]
//               );
//               createdCount++;
//             } else {
//               skippedCount++;
//             }
//           }
//         }
//       }
//     }
//     res.json({
//       message: `Deleted ${deletedCount} old slots. Created ${createdCount} new slots. Skipped ${skippedCount} duplicates.`,
//     });
//   } catch (err) {
//     console.error('Error in bulkCreateSlots:', err);
//     res.status(500).json({ message: 'Error generating slots.' });
//   }
// };


exports.bulkCreateSlots = async (req, res) => {
  try {
    const { daysConfig } = req.body;
    if (!daysConfig || !Array.isArray(daysConfig)) {
      return res.status(400).json({ message: 'Missing daysConfig.' });
    }

    const today = new Date();
    const endDate = new Date(today);
    endDate.setMonth(today.getMonth() + 6);

    let createdCount = 0, skippedCount = 0, deletedCount = 0;
    let slotsToInsert = [];
    let slotsToDelete = [];

    for (const config of daysConfig) {
      const weekdayNum = weekdayMap[config.day];
      if (!weekdayNum) continue;

      // Find all future slots for this day_of_week
      const [oldSlots] = await pool.query(
        `SELECT id FROM demo_slots WHERE day_of_week = ? AND date >= CURDATE()`,
        [config.day]
      );
      for (const slot of oldSlots) {
        const [bookings] = await pool.query(
          `SELECT id FROM bookings WHERE slot_id = ?`,
          [slot.id]
        );
        if (bookings.length === 0) {
          slotsToDelete.push(slot.id);
        }
      }

      if (config.status === "weekly-off") continue;
      if (config.status !== "active") continue;

      for (let d = new Date(today); d <= endDate; d.setDate(d.getDate() + 1)) {
        const weekday = d.getDay() === 0 ? 7 : d.getDay();
        if (weekday === weekdayNum) {
          const dateStr = d.toISOString().slice(0, 10);
          const slots = generateSlotsForDate(dateStr, config.start, config.end, Number(config.interval));
          for (const slot of slots) {
            // Avoid exact duplicates (date, start_time, end_time)
            const [rows] = await pool.query(
              `SELECT id FROM demo_slots WHERE date = ? AND start_time = ? AND end_time = ?`,
              [slot.date, slot.start_time, slot.end_time]
            );
            if (rows.length === 0) {
              slotsToInsert.push([
                slot.date, slot.start_time, slot.end_time, 0, config.day, config.status, config.interval
              ]);
              createdCount++;
            } else {
              skippedCount++;
            }
          }
        }
      }
    }

    // Bulk delete unbooked old slots
    if (slotsToDelete.length) {
      await pool.query(
        `DELETE FROM demo_slots WHERE id IN (${slotsToDelete.join(',')})`
      );
      deletedCount = slotsToDelete.length;
    }

    // Bulk insert new slots
    if (slotsToInsert.length) {
      await pool.query(
        `INSERT INTO demo_slots (date, start_time, end_time, is_booked, day_of_week, day_status, interval_minutes)
         VALUES ?`,
        [slotsToInsert]
      );
      // createdCount is already tracked
    }

    res.json({
      message: `Deleted ${deletedCount} old slots. Created ${createdCount} new slots. Skipped ${skippedCount} duplicates.`,
    });
  } catch (err) {
    console.error('Error in bulkCreateSlots:', err);
    res.status(500).json({ message: 'Error generating slots.' });
  }
};



// Delete all slots for a given day of week (e.g., "mon")
exports.deleteSlotsByDayOfWeek = async (req, res) => {
  const { day } = req.params; // "mon", "tue", etc.
  if (!day || !weekdayMap[day]) {
    return res.status(400).json({ message: 'Invalid day parameter.' });
  }
  try {
    await pool.query(`DELETE FROM demo_slots WHERE day_of_week = ?`, [day]);
    res.json({ message: `All slots for ${day} deleted` });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting slots for day, Becuase demo is booked for some day.', error: err.message });
  }
};

exports.getRecurringSlotsConfig = async (req, res) => {
  const [rows] = await pool.query(
    `SELECT 
        day_of_week AS day, 
        MIN(start_time) AS start, 
        MAX(end_time) AS end,
        MAX(interval_minutes) AS \`interval\`,
        day_status AS status 
     FROM demo_slots 
     GROUP BY day_of_week`
  );
  res.json(rows);
};


exports.createOrCloseCustomSlot = async (req, res) => {
  try {
    const { date, start, end, openClose } = req.body;
    if (!date || !openClose) {
      return res.status(400).json({ message: 'Missing required fields.' });
    }

    // Find all demo_slots for this date
    const [existingSlots] = await pool.query(`SELECT id FROM demo_slots WHERE date = ?`, [date]);
    const slotIds = existingSlots.map(s => s.id);

    if (slotIds.length > 0) {
      // Check for related bookings
      const [bookings] = await pool.query(
        `SELECT id FROM bookings WHERE slot_id IN (${slotIds.map(() => '?').join(',')})`,
        slotIds
      );
      if (bookings.length > 0) {
        return res.status(400).json({
          message:
            "Cannot update or close slots for this date: bookings exist for one or more slots. Please cancel bookings before changing or closing slots for this date."
        });
      }
    }

    // --- "Open" Custom Slot ---
    if (openClose === "open") {
      if (!start || !end) {
        return res.status(400).json({ message: 'Missing required fields for open slot.' });
      }
      // 1. Save to custom_slots (as you already do)
      const [rows] = await pool.query(
        `SELECT id FROM custom_slots WHERE date = ? AND start = ? AND end = ? AND openClose = 'open'`,
        [date, start, end]
      );
      if (rows.length === 0) {
        await pool.query(
          `INSERT INTO custom_slots (date, openClose, start, end) VALUES (?, 'open', ?, ?)`,
          [date, start, end]
        );
      }

      // 2. Remove existing demo_slots for that date
      await pool.query(`DELETE FROM demo_slots WHERE date = ?`, [date]);
      // 3. Generate new slots for that date using start/end/interval
      // (Assume default interval 10min, or parametrize if you want)
      const interval = 10; // minutes, or get from req.body
      const slots = generateSlotsForDate(date, start, end, interval);
      for (const slot of slots) {
        await pool.query(
          `INSERT INTO demo_slots (date, start_time, end_time) VALUES (?, ?, ?)`,
          [slot.date, slot.start_time, slot.end_time]
        );
      }
      res.json({ message: "Custom slot created and demo_slots updated." });

    } 
    // --- "Close" Custom Slot ---
    else if (openClose === "close") {
      await pool.query(
        `UPDATE custom_slots SET openClose = 'close', start = NULL, end = NULL WHERE date = ?`,
        [date]
      );
      // Remove all demo_slots for this date
      await pool.query(`DELETE FROM demo_slots WHERE date = ?`, [date]);
      res.json({ message: "Slots for this date have been closed and demo_slots removed." });
    }
  } catch (err) {
    console.error('Error in createOrCloseCustomSlot:', err);
    res.status(500).json({ message: 'Error handling custom slot.' });
  }
};

exports.getDaysStatus = async (req, res) => {
  try {
    // Get all slots
    const [slots] = await pool.query(`SELECT day_of_week FROM demo_slots`);
    // Make a set of days that have slots
    const activeDaysSet = new Set(slots.map(s => s.day_of_week));
    // Map your weekday keys
    const weekDays = ['mon','tue','wed','thu','fri','sat','sun'];
    // Find inactive days
    const inactiveDays = weekDays.filter(day => !activeDaysSet.has(day));
    res.json({ inactiveDays, activeDays: weekDays.filter(day => activeDaysSet.has(day)) });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching days status', error: err.message });
  }
};