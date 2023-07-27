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

//? Below is a mongoose db test search for later application in member search
// const Application = require('../models/applications.js');
// router.get('/test', async (req, res) => {
//   const test = await Application.find({});
//   console.log('Below is the test'.red);
//   console.log(test);

//   const testArray = test.map((doc) => doc.companyName);
//   console.log('Below is the test array'.red);
//   console.log(testArray);

//   res.send(test);
// });

//* Membership Routes
router
  .route('/')
  .get(memberships.renderMembershipPage)
  .post(membershipApplicationValidation, memberships.handleApplicationForm);

router.route('/membership-brochure-pdf').get(memberships.getMembershipBrochure);

router.route('/membership-levels-pdf').get(memberships.getLevelsBrochure);

module.exports = router;
