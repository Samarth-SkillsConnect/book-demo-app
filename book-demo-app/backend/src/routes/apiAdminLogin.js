// const express = require('express');
// const router = express.Router();
// const jwt = require('jsonwebtoken');
// const pool = require('../config/db');
// const bcrypt = require('bcrypt');


// const ADMIN_EMAIL = 'admin@example.com';
// const ADMIN_PASSWORD = 'admin123';


// // POST /api/admin/login
// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;
//   if (!email || !password)
//     return res.status(400).json({ message: 'Email and password required.' });

//   try {
//     // Find admin by email
//     const [rows] = await pool.query(
//       'SELECT * FROM admins WHERE email = ? LIMIT 1',
//       [email]
//     );
//     const admin = rows[0];

//     if (!admin)
//       return res.status(401).json({ message: "Invalid credentials" });

//     const passwordMatch = await bcrypt.compare(password, admin.password);
//     if (!passwordMatch)
//       return res.status(401).json({ message: "Invalid credentials" });

//     // Issue JWT
//     const token = jwt.sign(
//       { id: admin.id, email: admin.email, isAdmin: true },
//       process.env.JWT_SECRET,
//       { expiresIn: '1d' }
//     );
//     res.json({ token });
//   } catch (err) {
//     res.status(500).json({ message: "Login error", error: err.message });
//   }
// });

// module.exports = router;


const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

// Hardcoded admin credentials
const ADMIN_EMAIL = 'admin@skillsconnect.com';
const ADMIN_PASSWORD = 'admin1234';

// POST /api/admin/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: 'Email and password required.' });

  // Hardcoded check
  if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // Issue JWT
  const token = jwt.sign(
    { email, isAdmin: true },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );
  res.json({ token });
});

module.exports = router;