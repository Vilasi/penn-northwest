const express = require('express');
const router = express.Router({ mergeParams: true });

//* Import Controller
const admin = require('../controllers/admin');
//* Middleware
const isLoggedIn = require('../utils/middleware/isLoggedIn');
const isAdmin = require('../utils/middleware/isAdmin');

router.route('/').get(isLoggedIn, isAdmin, admin.adminIndex);

router
  .route('/promote-to-admin/:id')
  .patch(isLoggedIn, isAdmin, admin.promoteToAdmin);

module.exports = router;
