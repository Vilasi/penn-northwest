async function isLoggedIn(req, res, next) {
  if (!req.isAuthenticated() && req.originalUrl !== '/login') {
    console.log('User is not logged in.');
    //TODO -- Cache the original URL of this so that it goes back to where the URL was taking us
    req.flash('error', 'Please sign in to continue.');
    res.redirect('/login');
  } else {
    next();
  }
}

module.exports = isLoggedIn;
