//! Events Routes
const express = require('express');
const router = express.Router({ mergeParams: true });
const multer = require('multer');
const { storage } = require('../config/cloudinary');
const upload = multer({ storage });
const errorHandler = require('../utils/error-handlers/errorHandler');

//* Import Controllers
const events = require('../controllers/events.js');

//* Import Validations
const {
  imageUploadValidation,
  eventValidation,
  paidEventValidation,
} = require('../utils/middleware/joiValidations');

//* Import Middleware
const isLoggedIn = require('../utils/middleware/isLoggedIn.js');
// TODO Add back in isLoggedIn to '/' POST request
router
  .route('/')
  .get(events.index)
  .post(
    isLoggedIn,
    upload.single('eventImage'),
    errorHandler.handleCloudinaryError,
    imageUploadValidation,
    eventValidation,
    events.createEvent
  );

//* For deleting individual events
router.route('/:id').delete(isLoggedIn, events.deleteEvent);

//* Paid Event Route - Stripe
router
  .route('/create-checkout-session')
  .post(paidEventValidation, events.handleCheckout);

//* Stripe integrated redirects for payment success and payment cancel
//TODO Flesh these out
router.route('/checkout/success').get(events.checkoutSuccess);
router.route('/checkout/cancel').get(events.checkoutCancel);

module.exports = router;
