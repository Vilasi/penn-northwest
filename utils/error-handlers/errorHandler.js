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
      message: err.message,
    };

    return res.status(err.http_code).render('pages/error', { err: error });
  } else if (err) {
    return res.status(500).render('pages/error', {
      err: createError(
        500,
        'An error occurred while uploading the file to Cloudinary.'
      ),
    });
  }
};
