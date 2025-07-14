
const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  // Accepts 'Authorization: Bearer <token>'
  const authHeader = req.header('Authorization');
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Optional: enforce admin-only access based on your payload
    if (!decoded.isAdmin) {
      return res.status(403).json({ message: "Forbidden. Admins only." });
    }

    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token." });
  }
};