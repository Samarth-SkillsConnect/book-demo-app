// Example middleware for basic admin authentication
// You can improve this (JWT, session, etc) as needed

module.exports = function adminAuth(req, res, next) {
  // Example: check for a hardcoded token or session
  const adminToken = req.headers['x-admin-token'];
  if (adminToken && adminToken === process.env.ADMIN_TOKEN) {
    return next();
  }
  res.status(401).json({ message: 'Unauthorized' });
};