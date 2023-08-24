const createHttpError = require('http-errors');
const mongoose = require('mongoose');

module.exports.handleMongooseError = function (err) {
  return err instanceof mongoose.Error;
};

//* This handles cloudinary upload errors
module.exports.handleCloudinaryError = async function (err, req, res, next) {
  if (err && err.http_code === 400) {
    const error = {
      status: 400,
      message: 'Error, the maximum photo upload size is 10MB.',
    };

    // If the below fails to properly redirect to '/events', remove the .status(400)
    req.flash('error', 'Error, the maximum photo upload size is 10MB.');
    return res.status(400).redirect('/events');
  } else if (err) {
    return res.status(500).render('pages/error', {
      err: createError(
        500,
        'An error occurred while uploading the photo to Cloudinary. Please try again.'
      ),
    });
  }
};
