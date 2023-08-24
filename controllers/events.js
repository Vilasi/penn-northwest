const multer = require('multer');
const { cloudinary, storage } = require('../cloudinary');
const upload = multer({ storage });

//* Import db models
const Event = require('../models/events');

//* Connect Stripe
const stripe = require('stripe')(process.env.STRIPE_TEST_SECRET_KEY);

module.exports.index = async (req, res, next) => {
  const events = await Event.find({});
  // const events = null;

  //* This logic will handle a database lookup failure
  if (!events) {
    res.render('pages/events', { eventFailure: true });
  }
  // console.log('events----------------------------------------------'.red);
  // console.log(events);
  // console.log(
  //   'events length----------------------------------------------'.red
  // );
  // console.log(events.length);
  res.render('pages/events', { events, eventFailure: false });
};

module.exports.createEvent = async (req, res, next) => {
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

  // res.send(finalDoc);
  req.flash('success', `Your event, ${finalDoc.name}, has been created!`);
  res.redirect('/events');
};
