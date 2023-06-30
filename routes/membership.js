//! Events Routes

//* Import Controllers
const memberships = require('../controllers/membership.js');

const express = require('express');
const router = express.Router({ mergeParams: true });

router.route('/').get(memberships.renderMembershipPage);

router.route('/membership-brochure-pdf').get(memberships.getMembershipBrochure);

router.route('/membership-levels-pdf').get(memberships.getLevelsBrochure);

module.exports = router;
