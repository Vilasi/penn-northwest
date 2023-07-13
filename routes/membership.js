//! Membership Routes

//* Import Controllers
const memberships = require('../controllers/membership.js');

//* Import Middleware
const validateReCaptcha = require('../utils/middleware/reCaptchaValidate.js');

//* Import Validations
const {
  membershipApplicationValidation,
} = require('../utils/middleware/joiValidations.js');

//* Init Router
const express = require('express');
const router = express.Router({ mergeParams: true });

//* Membership Routes
router
  .route('/')
  .get(memberships.renderMembershipPage)
  .post(
    membershipApplicationValidation,
    validateReCaptcha,
    memberships.handleMembershipForm
  );

router.route('/membership-brochure-pdf').get(memberships.getMembershipBrochure);

router.route('/membership-levels-pdf').get(memberships.getLevelsBrochure);

module.exports = router;
