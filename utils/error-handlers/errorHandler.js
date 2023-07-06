const mongoose = require('mongoose');

module.exports.handleMongooseError = function (err) {
  return err instanceof mongoose.Error;
};
