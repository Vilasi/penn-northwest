//! Events Routes
const express = require('express');
const router = express.Router({ mergeParams: true });

router.get('/', (req, res) => {
  res.render('pages/membership');
});

module.exports = router;
