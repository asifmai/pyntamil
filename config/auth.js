exports.ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    if (req.user.isverified) {
      return next();
    }
    req.logout();
    req.flash('error_msg', 'Email not verified');
    res.redirect('/users/login');
  }
  req.flash('error_msg', 'Please log in to view that resource');
  res.redirect('/users/login');
};

exports.ensureAuthenticatedLogin = (req, res, next) => {
  if (req.isAuthenticated()) {
    if (req.user.isverified) {
      res.redirect('/dashboard');
    }
  }
  return next();
};