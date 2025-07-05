const DemoSlot = require('../models/DemoSlot');

exports.createSlot = async (req, res) => {
  try {
    const { date, start_time, end_time } = req.body;
    if (!date || !start_time || !end_time) {
      return res.status(400).json({ message: 'Missing fields' });
    }
    const slotId = await DemoSlot.createSlot(date, start_time, end_time);
    res.json({ slotId });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};