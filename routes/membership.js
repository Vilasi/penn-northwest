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
  .post(isLoggedIn, newMemberValidation, memberships.postNewMember);

router
  .route('/post-new-member/:id')
  .delete(isLoggedIn, memberships.deleteMember);

router.route('/membership-brochure-pdf').get(memberships.getMembershipBrochure);

router.route('/membership-levels-pdf').get(memberships.getLevelsBrochure);

module.exports = router;
