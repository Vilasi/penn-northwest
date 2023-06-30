//! Events Routes

//* Import Controllers
const memberships = require('../controllers/membership.js');

const express = require('express');
const router = express.Router({ mergeParams: true });

router.route('/').get(memberships.renderMembershipPage);

router.route('/membership-brochure').get(memberships.getMembershipBrochure);

module.exports = router;
