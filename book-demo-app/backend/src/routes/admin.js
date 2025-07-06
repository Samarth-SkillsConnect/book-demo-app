// const express = require('express');
// const router = express.Router();
// const adminController = require('../controllers/adminController');

// router.post('/set-slot', adminController.createSlot);

// module.exports = router;

const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Get all slots with bookings count
router.get('/slots', adminController.getAllSlots);

// Create a new slot
router.post('/slots', adminController.createSlot);

// Delete a slot
router.delete('/slots/:id', adminController.deleteSlot);

// Get all bookings for a slot
router.get('/slots/:id/bookings', adminController.getBookingsForSlot);

module.exports = router;