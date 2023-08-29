const multer = require('multer');
const { cloudinary, storage } = require('../config/cloudinary');
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

//TODO WRITE VALIDATIONS FOR THIS
module.exports.handleCheckout = async (req, res, next) => {
  const attendant = req.body.attendant;
  const event = await Event.findById(attendant.id);

  if (!event) {
    req.flash(
      'error',
      'Event not found. Please try again or contact us directly.'
    );
    res.redirect('/events');
  }

  console.log(attendant);
  console.log(event);
  // res.send(event);

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: event.name,
              description: event.description,
            },
            unit_amount: event.priceInCents,
          },
          quantity: attendant.ticketQuantity,
        },
      ],
      success_url: `${process.env.SERVER_URL}/events/checkout/success`,
      cancel_url: `${process.env.SERVER_URL}/events/checkout/cancel`,
    });
    return res.redirect(303, session.url);
  } catch (err) {
    //TODO Fully investigate stripe errors
    return res.status(500).send(err);
  }
};

module.exports.checkoutSuccess = async (req, res, next) => {
  res.render('/checkout/success');
};
module.exports.checkoutCancel = async (req, res, next) => {
  res.render('/checkout/cancel');
};
