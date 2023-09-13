async function isAdmin(req, res, next) {
  console.log('below is the user role================================'.green);
  console.log(req.user.role);
  if (req.user.role !== 'admin') {
    req.flash(
      'error',
      'You do not have the necessary permissions to access this page.'
    );
    return res.redirect('/');
  }
  next();
}

module.exports = isAdmin;
