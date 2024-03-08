//! Membership Routes

//* Import Controllers
const memberships = require('../controllers/membership.js');

//* Import Validations
const {
  membershipApplicationValidation,
  newMemberValidation,
} = require('../utils/middleware/joiValidations.js');

//* Import Middleware
const isLoggedIn = require('../utils/middleware/isLoggedIn.js');
const isAdmin = require('../utils/middleware/isAdmin.js');
// const fileAdminLog = require('../utils/middleware/fileAdminLog');
// const getTodaysDate = require('../utils/getTodaysDate');

//* Init Router
const express = require('express');
const router = express.Router({ mergeParams: true });

//* Membership Routes
router
  .route('/')
  .get(memberships.renderMembershipPage)
  .post(membershipApplicationValidation, memberships.handleApplicationForm);

router
  .route('/post-new-member')
  .post(isLoggedIn, isAdmin, newMemberValidation, memberships.postNewMember);

router
  .route('/post-new-member/:id')
  .delete(isLoggedIn, isAdmin, memberships.deleteMember);

router
  .route('/post-new-member/admin/:id')
  .delete(isLoggedIn, isAdmin, memberships.adminDeleteMember);

router
  .route('/application/:id')
  .delete(isLoggedIn, isAdmin, memberships.deleteApplication);

module.exports = router;
