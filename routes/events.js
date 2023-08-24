//! Events Routes
const express = require('express');
const router = express.Router({ mergeParams: true });
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });
const errorHandler = require('../utils/error-handlers/errorHandler');

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
    errorHandler.handleCloudinaryError,
    imageUploadValidation,
    eventValidation,
    events.createEvent
  );

module.exports = router;
