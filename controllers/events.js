const multer = require('multer');
const { cloudinary, storage } = require('../cloudinary');
const upload = multer({ storage });

module.exports.index = async (req, res, next) => {
  res.render('pages/events');
};

module.exports.createEvent = async (req, res, next) => {
  console.log(req.body);
  res.send(req.body);
};
