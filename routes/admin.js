const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const { resourceStorage } = require('../config/cloudinary');
const uploadResource = multer({ 
  storage: resourceStorage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
});

const router = express.Router({ mergeParams: true });
const { Parser } = require('json2csv');


//* Import Controller
const admin = require('../controllers/admin');
//* Middleware
const isLoggedIn = require('../utils/middleware/isLoggedIn');
const isAdmin = require('../utils/middleware/isAdmin');

router.route('/').get(isLoggedIn, isAdmin, admin.adminIndex);

router.route('/update-event-order')
  .post(isLoggedIn, isAdmin, admin.updateEventOrder);

router
  .route('/promote-to-admin/:id')
  .patch(isLoggedIn, isAdmin, admin.promoteToAdmin);

router.route('/delete-user/:id').delete(isLoggedIn, isAdmin, admin.deleteUser);
router
  .route('/delete-event/:id')
  .delete(isLoggedIn, isAdmin, admin.deleteEvent);

router
  .route('/download-attendants/:eventId')
  .get(isLoggedIn, isAdmin, admin.downloadAttendantsCSV);

router
  .route('/add-new-resource')
  .post(isLoggedIn, isAdmin, uploadResource.single('resource-file'), admin.addResource);

router
  .route('/delete-resource/:id')
  .delete(isLoggedIn, isAdmin, admin.deleteResource);

router
  .route('/toggle-resource-featured/:id')
  .patch(isLoggedIn, isAdmin, admin.toggleResourceFeatured);

module.exports = router;
