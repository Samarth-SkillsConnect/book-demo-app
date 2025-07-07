
module.exports = function adminAuth(req, res, next) {
  const adminToken = req.headers['x-admin-token'];
  if (adminToken && adminToken === process.env.ADMIN_TOKEN) {
    return next();
  }
  res.status(401).json({ message: 'Unauthorized' });
};