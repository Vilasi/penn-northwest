const express = require('express');
const router = express.Router({ mergeParams: true });

//* Import Controller
const admin = require('../controllers/admin');

router.route('/').get(admin.adminIndex);

module.exports = router;
