const DemoSlot = require('../models/DemoSlot');

// Get all demo slots for a specific date (query param: date=YYYY-MM-DD)
exports.getSlotsByDate = async (req, res) => {
  try {
    const { date } = req.query;
    if (!date) {
      return res.status(400).json({ message: 'Date is required' });
    }
    const slots = await DemoSlot.getSlotsByDate(date);
    res.json(slots);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Create a new demo slot
exports.createDemoSlot = async (req, res) => {
  try {
    const { date, startTime, endTime } = req.body;
    if (!date || !startTime || !endTime) {
      return res.status(400).json({ message: 'date, startTime, and endTime are required' });
    }
    const slotId = await DemoSlot.createSlot(date, startTime, endTime);
    res.status(201).json({ id: slotId, message: 'Demo slot created' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Delete a demo slot
exports.deleteDemoSlot = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: 'Slot ID is required' });
    }
    // Optional: add a check to see if the slot exists first
    await DemoSlot.deleteSlot(id);
    res.json({ message: 'Demo slot deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};