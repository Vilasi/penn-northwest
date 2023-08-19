const multer = require('multer');
const { cloudinary, storage } = require('../cloudinary');
const upload = multer({ storage });

//* Import db models
const Event = require('../models/events');

module.exports.index = async (req, res, next) => {
  res.render('pages/events');
};

module.exports.createEvent = async (req, res, next) => {
  // TODO -- convert price to price in cents
  // TODO -- build event object
  // TODO Handle req.file photo storage on document
  const newEvent = req.body.event;

  newEvent.priceInCents = Number(newEvent.priceInCents) * 100;

  //If an image was uploaded, set it on newEvent
  if (req.file) {
    const images = {
      url: req.file.path,
      filename: req.file.filename,
    };
    newEvent.image = images;
  }

  console.log('newEvent----------------------------------------------'.red);
  console.log(newEvent);

  const eventDocument = new Event(newEvent);
  const finalDoc = await eventDocument.save();
  if (!finalDoc) {
    next(createError(500, 'Failed to create event.'));
  }

  res.send(finalDoc);
};
