const express = require('express');
const router = express.Router({ mergeParams: true });

//* Import Controller
const admin = require('../controllers/admin');
//* Middleware
const isLoggedIn = require('../utils/middleware/isLoggedIn');
const isAdmin = require('../utils/middleware/isAdmin');

router.route('/').get(isLoggedIn, isAdmin, admin.adminIndex);

router.route('/update-event-order')
  .post(isLoggedIn, isAdmin, admin.updateEventOrder);

router
  .route('/promote-to-admin/:id')
  .patch(isLoggedIn, isAdmin, admin.promoteToAdmin);

router.route('/delete-user/:id').delete(isLoggedIn, isAdmin, admin.deleteUser);
router
  .route('/delete-event/:id')
  .delete(isLoggedIn, isAdmin, admin.deleteEvent);
module.exports = router;
