const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');


router.get('/slots', adminController.getAllSlots);


router.post('/slots', adminController.createSlot);


router.delete('/slots/:id', adminController.deleteSlot);


router.get('/slots/:id/bookings', adminController.getBookingsForSlot);

module.exports = router;