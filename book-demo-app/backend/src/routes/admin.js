const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');


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

module.exports = router;