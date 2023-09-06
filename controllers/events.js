const multer = require('multer');
const { cloudinary, storage } = require('../config/cloudinary');
const upload = multer({ storage });

//* Import db models
const Event = require('../models/events');

//* Connect Stripe
const stripe = require('../config/stripe');

//* Events Index Page
module.exports.index = async (req, res, next) => {
  const events = await Event.find({});

  // This logic will handle a database lookup failure
  if (!events) {
    res.render('pages/events', { eventFailure: true });
  }
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
  console.log('BELOW IS THE EVENT============================='.red);
  console.log(event);

  //* Set event name and ticket quantity to the session
  req.session.ticketQuantity = attendant.ticketQuantity;
  req.session.eventName = event.name;
  req.session.paidAttendant = {};

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

  // Extract the relevant data from each Stripe event
  const data = events.data.map((event) => {
    return event.data;
  });

  // Initialize a receipt object with a null URL
  const receipt = { receiptURL: null };

  // Check if data exists, then extract the receipt URL from the first entry
  if (data) {
    receipt.receiptURL = data[0].object.receipt_url;
  }

  console.log(
    'BELOW IS THE REQ.SESSION============================================'.red
  );
  console.log(req.session);
  //TODO Send the date/time
  //TODO Send the attendee name/email
  const purchaseInfo = {
    ticketQuantity: req.session.ticketQuantity,
    eventName: req.session.eventName,
  };

  // Render the 'checkout/success' view and pass the receipt object to it
  res.render('checkout/success', { receipt, purchaseInfo });
};

//* Fires when a user cancels a stripe checkout page
module.exports.checkoutCancel = async (req, res, next) => {
  req.flash('error', 'Payment was cancelled.');
  res.redirect('/events');
};

//TODO Handle cloudinary image deletion
module.exports.deleteEvent = async (req, res, next) => {
  const { id } = req.params;
  const event = await Event.findByIdAndDelete(id);
  if (!event) {
    req.flash('error', 'Event deletion failed. Event not found in database.');
    res.redirect('/events');
  }

  //* This deletes the relevant image in the cloudinary photo repo
  const filename = event.image.filename;
  await cloudinary.uploader.destroy(filename);

  req.flash('success', `Event "${event.name}" Successfully Deleted.`);
  res.redirect('/events');
};
