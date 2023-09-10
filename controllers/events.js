const multer = require('multer');
const { cloudinary, storage } = require('../config/cloudinary');
const upload = multer({ storage });

//* Import db models
const Event = require('../models/events');
const Attendant = require('../models/attendants');
//* Import Utils
const sendMessage = require('../utils/middleware/freeEventEmail.js');
const validateReCaptcha = require('../utils/middleware/reCaptchaValidate.js');
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

//TODO Delete all attendants when the event is deleted.
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
  //Honeypot bot catcher
  if (req.body.honeypot) {
    req.flash('error', 'Bot detected. Registration cancelled.');
    res.redirect('/events');
  }

  // Validate reCAPTCHA response
  const captchaValidateBoolean = await validateReCaptcha(req);

  // If reCAPTCHA validation fails, display an error message and redirect to the membership application page
  if (!captchaValidateBoolean) {
    req.flash(
      'error',
      'The captcha check failed to validate. Please retry the membership application, or contact us directly.'
    );
    return res.redirect('/events');
  }

  // Extracting the 'attendant' object from the request body
  const attendant = req.body.attendant;

  const event = await Event.findById(attendant.id);
  // If the event is not found, redirect to the events page with an error message
  if (!event) {
    req.flash(
      'error',
      'Event registration failed. Please try again or contact us directly.'
    );
    res.redirect('/events');
  }

  // Creating a new Attendant document with the provided details
  const newAttendantDoc = new Attendant({
    dateTime: attendant.dateTime,
    ticketQuantity: '1',
    eventName: event.name,
    attendantName: attendant.name,
    email: attendant.email,
    event: attendant.id,
  });
  // Storing the attendant details in the session
  req.session.attendant = {
    dateTime: attendant.dateTime,
    ticketQuantity: '1',
    eventName: event.name,
    attendantName: attendant.name,
    email: attendant.email,
    eventId: attendant.id,
    location: event.location,
  };
  // Saving the new Attendant document to the database
  const createdAttendant = await newAttendantDoc.save();
  // If the document is not saved, redirect to the events page with an error message
  if (!createdAttendant) {
    req.flash(
      'error',
      'Event registration failed. Please try again or contact us directly.'
    );
    res.redirect('/events');
  }

  // Adding the new attendant to the event's attendees array
  event.attendees.push(createdAttendant);
  // Saving the updated event document to the database
  const eventUpdatedAttendantArray = await event.save();
  // If the updated event document is not saved, redirect to the events page with an error message
  if (!eventUpdatedAttendantArray) {
    req.flash(
      'error',
      'Event registration failed. Please try again or contact us directly.'
    );
    res.redirect('/events');
  }

  // Redirecting to the free registration confirmation page
  res.redirect('/events/free-registration-confirmation');
};

//TODO Integrate Google ReCaptcha into this since it can be accessed by unlogged in users
module.exports.renderRegistrationConfirmation = async (req, res, next) => {
  const attendant = req.session.attendant;
  try {
    //TODO Uncomment out the email bit after reCaptcha is setup
    // sendMessage(attendant);
  } catch (error) {
    req.flash('error', 'Confirmation email failed to send.');
  }

  res.render('checkout/freeRegistration', { attendant });
};
