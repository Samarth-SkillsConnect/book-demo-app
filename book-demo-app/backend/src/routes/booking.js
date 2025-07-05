const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

router.get('/demo-slots', bookingController.getSlotsByDate);
router.post('/book-demo', bookingController.bookDemo);

module.exports = router;