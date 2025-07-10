const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const db = require('../config/customSlots');

router.get('/slots', adminController.getAllSlots);

router.post('/slots', adminController.createSlot);

router.delete('/slots/:id', adminController.deleteSlot);

router.get('/slots/:id/bookings', adminController.getBookingsForSlot);

router.get('/bookings', adminController.getAllBookings);

router.post('/bookings/:id/accept', adminController.acceptBooking);

router.post('/bookings/:id/reject', adminController.rejectBooking);

router.post('/bookings/:id/set-link', adminController.setBookingMeetLink);

router.post('/slots/custom', adminController.createOrCloseCustomSlot);

router.post('/slots/bulk-generate', adminController.bulkCreateSlots);

router.delete('/slots/day/:day', adminController.deleteSlotsByDayOfWeek);

router.get('/slots/days-status', adminController.getDaysStatus);

router.get('/slots/custom', async (req, res) => {
  try {
    // Fetch all custom slots from your DB
    const slots = await db.getAllCustomSlots();
    res.json({ slots });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch custom slots" });
  }
});

router.get('/slots/recurring', adminController.getRecurringSlotsConfig);

module.exports = router;