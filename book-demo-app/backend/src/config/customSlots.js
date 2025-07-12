const pool = require('../config/db');

async function getAllCustomSlots() {
    const [rows] = await pool.query('SELECT id, date, openClose, start, end FROM custom_slots ORDER BY date DESC, start ASC');
    return rows;
}

module.exports = { getAllCustomSlots };