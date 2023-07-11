//! Membership Routes

//* Import Controllers
const memberships = require('../controllers/membership.js');

//* Import Validations
const {
  membershipApplicationValidation,
} = require('../utils/middleware/joiValidations.js');

//* Init Router
const express = require('express');
const router = express.Router({ mergeParams: true });

//TODO BUILD OUT MEMBERSHIP ROUTES - EMAIL, DATABASE, ETC
//TODO BUILD OUT MEMBERSHIP ROUTES - EMAIL, DATABASE, ETC
//TODO BUILD OUT MEMBERSHIP ROUTES - EMAIL, DATABASE, ETC
//TODO BUILD OUT MEMBERSHIP ROUTES - EMAIL, DATABASE, ETC
//TODO BUILD OUT MEMBERSHIP ROUTES - EMAIL, DATABASE, ETC
router
  .route('/')
  .get(memberships.renderMembershipPage)
  .post(membershipApplicationValidation, (req, res) => {
    console.log(req.body);
    res.json(req.body);
  });

router.route('/membership-brochure-pdf').get(memberships.getMembershipBrochure);

router.route('/membership-levels-pdf').get(memberships.getLevelsBrochure);

module.exports = router;
