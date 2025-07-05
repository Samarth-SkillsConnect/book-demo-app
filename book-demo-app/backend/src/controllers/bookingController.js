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
    const { slot_id, first_name, last_name, company_name, mobile_number, email, description, guests } = req.body;
    const ip_address = req.ip;
    const test = req.query.test === 'true';

    const slot = await DemoSlot.getSlotById(slot_id);
    if (!slot || slot.is_booked) return res.status(400).json({ message: 'Slot not available' });


    // if (!test && await Booking.hasBookedInLast24Hours(ip_address)) {
    //   return res.status(403).json({ message: 'You have already booked in the last 24 hours.' });
    // }


    const guests_str = guests ? guests.split(',').map(g => g.trim()).filter(g => g).join(',') : '';
    const bookingId = await Booking.create({
      slot_id,
      first_name,
      last_name,
      company_name,
      mobile_number,
      email,
      description,
      guests: guests_str,
      ip_address
    });

 
    await DemoSlot.bookSlot(slot_id);

    sendBookingEmails({ slot, first_name, last_name, company_name, mobile_number, email, description, guests: guests_str });

    res.json({ message: 'Booking successful' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};