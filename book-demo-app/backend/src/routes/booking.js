const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");

router.get("/test", (req, res) => res.json({ message: "API is working" }));
router.get("/demo-slots", bookingController.getSlotsByDate);
router.post("/book-demo", bookingController.bookDemo);
router.post("/slots/bulk", bookingController.bulkCreateSlots);

module.exports = router;
