const multer = require('multer');
const { cloudinary, storage } = require('../config/cloudinary');
const upload = multer({ storage });

//* Import db models
const Event = require('../models/events');

//* Connect Stripe
const stripe = require('../config/stripe');

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

  console.log('BELOW IS THE ATTENDANT============================='.red);
  console.log(attendant);

  if (!event) {
    req.flash(
      'error',
      'Event not found. Please try again or contact us directly.'
    );
    res.redirect('/events');
  }

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

/**
 ** Handle checkout success
 *
 * @param {object} req - The Express request object
 * @param {object} res - The Express response object
 * @param {function} next - The Express next middleware function
 */
//? Relevant docs for the below
//https://stripe.com/docs/api/events
//https://stripe.com/docs/api/events/retrieve
//https://stripe.com/docs/api/events/list?lang=node
//https://stripe.com/docs/api/events/types?lang=node
module.exports.checkoutSuccess = async (req, res, next) => {
  // Fetch the last 3 'charge.succeeded' events from Stripe
  const events = await stripe.events.list({
    limit: 3,
    type: 'charge.succeeded',
  });

  // console.log(
  //   'BELOW IS THE EVENT RETURNED FROM STRIPE------------------------------------------------'
  //     .red
  // );
  // console.log(events);

  // Extract the relevant data from each Stripe event
  const data = events.data.map((event) => {
    return event.data;
  });

  console.log(
    'BELOW IS THE DATA ARRAY------------------------------------------------'
      .red
  );
  console.log(data);

  // Initialize a receipt object with a null URL
  const receipt = { receiptURL: null };

  // Check if data exists, then extract the receipt URL from the first entry
  if (data) {
    console.log(data[0]);
    receipt.receiptURL = data[0].object.receipt_url;
  }

  // Render the 'checkout/success' view and pass the receipt object to it
  res.render('checkout/success', { receipt });
};

//* Fires when a user cancels a stripe checkout page
module.exports.checkoutCancel = async (req, res, next) => {
  req.flash('error', 'Payment was cancelled.');
  res.redirect('/events');
};
