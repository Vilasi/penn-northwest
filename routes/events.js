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
  freeEventValidation,
} = require('../utils/middleware/joiValidations');

//* Import Middleware
const isLoggedIn = require('../utils/middleware/isLoggedIn.js');
const isAdmin = require('../utils/middleware/isAdmin');
router
  .route('/')
  .get(events.index)
  .post(
    isLoggedIn,
    isAdmin,
    upload.single('eventImage'),
    errorHandler.handleCloudinaryError,
    imageUploadValidation,
    eventValidation,
    events.createEvent
  );

//* For deleting individual events
router.route('/:id').delete(isLoggedIn, isAdmin, events.deleteEvent);

// router.route('/:id').patch(isLoggedIn, isAdmin, events.patchEvent);

//* Paid Event Route - Stripe
router
  .route('/create-checkout-session')
  .post(paidEventValidation, events.handleCheckout);

//* Stripe integrated redirects for payment success and payment cancel
router.route('/checkout/success').get(events.checkoutSuccess);
router.route('/checkout/cancel').get(events.checkoutCancel);
router
  .route('/free-registration-confirmation')
  .get(events.renderRegistrationConfirmation);

router
  .route('/register-free-event')
  .post(freeEventValidation, events.registerFreeEvent);

module.exports = router;
