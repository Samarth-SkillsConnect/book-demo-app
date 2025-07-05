const pool = require('../config/db');

const Booking = {
  async create(data) {
    const { slot_id, first_name, last_name, company_name, mobile_number, email, description, guests, ip_address } = data;
    const [res] = await pool.query(
      'INSERT INTO bookings (slot_id, first_name, last_name, company_name, mobile_number, email, description, guests, ip_address) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [slot_id, first_name, last_name, company_name, mobile_number, email, description, guests, ip_address]
    );
    return res.insertId;
  },
  async hasBookedInLast24Hours(ip_address) {
    const [rows] = await pool.query(
      'SELECT id FROM bookings WHERE ip_address = ? AND created_at > DATE_SUB(NOW(), INTERVAL 24 HOUR)',
      [ip_address]
    );
    return rows.length > 0;
  }
};

module.exports = Booking;