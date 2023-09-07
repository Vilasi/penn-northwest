const multer = require('multer');
const { cloudinary, storage } = require('../config/cloudinary');
const upload = multer({ storage });

//* Import db models
const Event = require('../models/events');
const Attendant = require('../models/attendants');

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

  const eventDocument = new Event(newEvent);
  const finalDoc = await eventDocument.save();
  if (!finalDoc) {
    next(createError(500, 'Failed to create event.'));
  }

  req.flash('success', `Your event, ${finalDoc.name}, has been created!`);
  res.redirect('/events');
};

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

  // Builds an attendant object and stores it in the session for retrieval in checkoutSuccess below
  req.session.attendant = {
    id: attendant.id,
    dateTime: attendant.dateTime,
    ticketQuantity: attendant.ticketQuantity,
    eventName: event.name,
    attendantName: attendant.name,
    email: attendant.email,
  };

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

//* Handle checkout success
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

  const attendant = req.session.attendant; // Get the attendant data from the session
  // Create a new Attendant document with relevant data
  const newAttendantDoc = new Attendant({
    dateTime: attendant.dateTime,
    ticketQuantity: attendant.ticketQuantity,
    eventName: attendant.eventName,
    attendantName: attendant.attendantName,
    email: attendant.email,
    event: attendant.id,
  });

  const createdAttendant = await newAttendantDoc.save(); // Save the new Attendant document to the database
  const event = await Event.findById(attendant.id); // Find the relevant Event by ID

  // Log an error message if the event lookup failed
  if (!event) {
    console.log('The attendant id has failed to lookup a relevant Event.');
  } else {
    // Add the newly created Attendant to the Event's attendees reference array and save the Event
    await event.attendees.push(createdAttendant);
    await event.save();
  }

  // Render the 'checkout/success' view and pass the receipt object to it
  res.render('checkout/success', { receipt, attendant });
};

//* Fires when a user cancels a stripe checkout page
module.exports.checkoutCancel = async (req, res, next) => {
  req.flash('error', 'Payment was cancelled.');
  res.redirect('/events');
};

module.exports.deleteEvent = async (req, res, next) => {
  const { id } = req.params;
  const event = await Event.findByIdAndDelete(id);
  if (!event) {
    req.flash('error', 'Event deletion failed. Event not found in database.');
    res.redirect('/events');
  }

  // This deletes the relevant image in the cloudinary photo repo
  const filename = event.image.filename;
  await cloudinary.uploader.destroy(filename);

  req.flash('success', `Event "${event.name}" Successfully Deleted.`);
  res.redirect('/events');
};

module.exports.registerFreeEvent = async (req, res, next) => {
  res.send('working');
};
