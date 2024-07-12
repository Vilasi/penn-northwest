async function isAdmin(req, res, next) {
  console.log('An Admin Function has been activated by:'.red);
  console.log(req.user);
  console.log('User role:'.yellow);
  console.log(req.user.role);
  if (req.user.role !== 'admin') {
    req.flash(
      'error',
      'You do not have the necessary permissions to access this page.'
    );
    return res.redirect('/');
  } else {
    next();
  }
}

module.exports = isAdmin;
