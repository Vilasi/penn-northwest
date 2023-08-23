//! Events Routes
const express = require('express');
const router = express.Router({ mergeParams: true });
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });

//* Import Controllers
const events = require('../controllers/events.js');

//* Import Validations
const {
  imageUploadValidation,
  eventValidation,
} = require('../utils/middleware/joiValidations');

//* Import Middleware
const isLoggedIn = require('../utils/middleware/isLoggedIn.js');
//TODO Don't forget to put isLoggedIn back into the router "/" post
router
  .route('/')
  .get(events.index)
  .post(
    upload.single('eventImage'),
    imageUploadValidation,
    eventValidation,
    events.createEvent
  );

module.exports = router;
