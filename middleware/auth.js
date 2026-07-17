function requireAdmin(req, res, next) {
  if (req.session && req.session.isAdmin) return next();
  return res.redirect(`/admin/login?lang=${req.lang}`);
}

module.exports = { requireAdmin };
