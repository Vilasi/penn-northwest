const multer = require('multer');
const { cloudinary, storage } = require('../config/cloudinary');
const upload = multer({ storage });

//* Import db models
const Event = require('../models/events');
const Attendant = require('../models/attendants');
//* Import Utils
const sendMessage = require('../utils/middleware/freeEventEmail.js');
const sendPaidEventReceipt = require('../utils/middleware/paidEventEmail.js');
// const validateReCaptcha = require('../utils/middleware/reCaptchaValidate.js');
const fileAdminLog = require('../utils/middleware/fileAdminLog');
const getTodaysDate = require('../utils/getTodaysDate');
//* Connect Stripe
const stripe = require('../config/stripe');

//* Events Index Page
module.exports.index = async (req, res, next) => {
  const events = await Event.find({}).sort({ position: 1 });

  // This logic will handle a database lookup failure
  if (!events) {
    res.render('pages/events', { eventFailure: true });
  }
  res.render('pages/events', { events, eventFailure: false });
};

//! Create Event
module.exports.createEvent = async (req, res, next) => {
  const newEvent = req.body.event;
  const eventCount = await Event.countDocuments();
  console.log(
    'A new event form has been received, pending adding to the database:'.green
  );
  console.log(newEvent);

  //Standardize the price into cents (from string) accounting for JS multiplication decimal errors
  newEvent.priceInCents = Math.floor(Number(newEvent.priceInCents) * 100);

  //If an image was uploaded, set it on newEvent
  if (req.file) {
    const images = {
      url: req.file.path,
      filename: req.file.filename,
    };
    newEvent.image = images;
    newEvent.position = eventCount;
  }

  const eventDocument = new Event(newEvent);
  const finalDoc = await eventDocument.save();
  if (!finalDoc) {
    next(createError(500, 'Failed to create event.'));
  }

  // Log event creation to admin actionsLog
  const logSuccess = await fileAdminLog(
    req.user,
    `Event "${finalDoc.name}" Created on ${getTodaysDate()}`
  );

  // If actionsLog fails, display an error message and redirect
  if (!logSuccess) {
    req.flash('error', 'Admin not found');
    return res.redirect('/events');
  }

  console.log('A new event has been created and added to the database:'.green);
  console.log(finalDoc);

  req.flash('success', `Your event, ${finalDoc.name}, has been created!`);
  res.redirect('/events');
};

//! Handle Checkout
module.exports.handleCheckout = async (req, res, next) => {
  const attendant = req.body.attendant;
  const event = await Event.findById(attendant.id);

if (!Array.isArray(attendant.guestNames)) {
  try {
    attendant.guestNames = JSON.parse(attendant.guestNames);
    if (!Array.isArray(attendant.guestNames)) {
      attendant.guestNames = []; // Ensure fallback to array
    }
  } catch (error) {
    attendant.guestNames = []; // Ensure fallback to array
  }
}

  if (!event) {
    req.flash(
      'error',
      'Event not found. Please try again or contact us directly.'
    );
    res.redirect('/events');
  }

  //* Handle sponsorship unit creation
  const sponsorshipSelected = {
    name: 'No Sponsorship Selected',
    description: 'N/A',
    unit_amount: 0,
    quantity: 1,
    ticketQuantity: 0,
  };

  if (
    attendant.sponsorshipTier !== 'none' &&
    attendant.sponsorshipTier !== undefined
  ) {
    const sponsorshipTier = Number(attendant.sponsorshipTier);

    sponsorshipSelected.name = event.tierNames[sponsorshipTier];
    sponsorshipSelected.description = `${event.tierNames[sponsorshipTier]} Sponsorship Package. Includes ${event.tierTicketsIncluded[sponsorshipTier]} tickets.`;
    sponsorshipSelected.ticketQuantity = `${event.tierTicketsIncluded[sponsorshipTier]}`;

    const tierPriceInCents = Math.floor(
      event.tierPrices[sponsorshipTier] * 100
    );
    sponsorshipSelected.unit_amount = tierPriceInCents;
    sponsorshipSelected.quantity = 1;
  }

  console.log('New Event Attendee Information:'.green);
  console.log('Event:'.yellow);
  console.log(event);
  console.log('Attendant:'.yellow);
  console.log(attendant);
  console.log('Sponsorship Stripe Line Item:'.yellow);
  console.log(sponsorshipSelected);
  // return res.send(sponsorshipSelected);
  // Builds an attendant object and stores it in the session for retrieval in checkoutSuccess below
  req.session.attendant = {
    id: attendant.id,
    dateTime: attendant.dateTime,
    ticketQuantity: attendant.ticketQuantity,
    eventName: event.name,
    attendantName: attendant.name,
    email: attendant.email,
    location: event.location,
    sponsorship: sponsorshipSelected.name,
    sponsorshipTickets: sponsorshipSelected.ticketQuantity,
    guestNames: attendant.guestNames,
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
              name: `${event.name} Ticket(s)`,
              description: event.description,
            },
            // unit_amount: event.priceInCents,
            unit_amount: attendant.ticketQuantity == 0 ? 0 : event.priceInCents,
          },
          // quantity: attendant.ticketQuantity,
          quantity:
            attendant.ticketQuantity == 0 ? 1 : attendant.ticketQuantity,
        },
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: sponsorshipSelected.name,
              description: sponsorshipSelected.description,
            },
            unit_amount: sponsorshipSelected.unit_amount,
          },
          quantity: sponsorshipSelected.quantity,
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

//! Checkout Success
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
    ticketQuantity:
      Number(attendant.ticketQuantity) + Number(attendant.sponsorshipTickets),
    eventName: attendant.eventName,
    attendantName: attendant.attendantName,
    email: attendant.email,
    event: attendant.id,
    sponsorship: attendant.sponsorship,
    guestNames: attendant.guestNames,
  });

  attendant.ticketQuantity = newAttendantDoc.ticketQuantity;

  console.log('New Attendant Checked Out:'.yellow);
  console.log(newAttendantDoc);

  try {
    sendPaidEventReceipt(attendant, receipt.receiptURL);
  } catch (error) {
    req.flash('error', 'Confirmation email failed to send.');
  }

  const createdAttendant = await newAttendantDoc.save(); // Save the new Attendant document to the database
  const event = await Event.findById(attendant.id); // Find the relevant Event by ID

  // Log an error message if the event lookup failed
  if (!event) {
    console.log(
      'The attendant id has failed to lookup a relevant Event. See checkoutSuccess function in events controller.'
        .red
    );
  } else {
    // Add the newly created Attendant to the Event's attendees reference array and save the Event
    await event.attendees.push(createdAttendant);
    await event.save();
  }

  // Render the 'checkout/success' view and pass the receipt object to it
  res.render('checkout/success', { receipt, attendant });
};

//! Checkout Cancel
//* Fires when a user cancels a stripe checkout page
module.exports.checkoutCancel = async (req, res, next) => {
  req.flash('error', 'Payment was cancelled.');
  res.redirect('/events');
};

//! Get Edit Page
module.exports.editEventPage = async (req, res, next) => {
  const { id } = req.params;
  const event = await Event.findById(id);
  console.log('Event to be edited:'.green);
  console.log(event);
  res.render('events/edit', { event });
};

//! Patch Event
module.exports.patchEvent = async (req, res, next) => {
  const { id } = req.params;
  const eventToUpdate = await Event.findById(id);
  if (!eventToUpdate) {
    req.flash(
      'error',
      'Database Lookup Error - Could not find original event in database.'
    );
    res.redirect('/events');
  }

  const updatedEvent = req.body.event;

  //Standardize the price into cents (from string) accounting for JS multiplication decimal errors
  updatedEvent.priceInCents = Math.floor(
    Number(updatedEvent.priceInCents) * 100
  );

  // This accounts for the user deleting all these fields - as they're not required.
  if (
    !updatedEvent.tierNames ||
    !updatedEvent.tierPrices ||
    !updatedEvent.tierTicketsIncluded
  ) {
    updatedEvent.tierNames = [];
    updatedEvent.tierPrices = [];
    updatedEvent.tierTicketsIncluded = [];
  }
  if (!updatedEvent.bulletPoints) {
    updatedEvent.bulletPoints = [];
  }

  // This handles a new image being uploaded - destroying the old image in the Cloudinary Repository (if it's not the default image).
  if (req.file) {
    if (
      eventToUpdate.image.filename !==
      'penn-northwest-website/omcwig0tniucxrhnqnqn'
    ) {
      const imageFilename = eventToUpdate.image.filename;
      await cloudinary.uploader.destroy(imageFilename);
    }

    const images = {
      url: req.file.path,
      filename: req.file.filename,
    };
    updatedEvent.image = images;
  }

  const updatedDoc = await Event.findByIdAndUpdate(id, updatedEvent, {
    new: true,
  });
  if (!updatedDoc) {
    next(createError(500, 'Failed to update event.'));
  }
  // Log event creation to admin actionsLog
  const logSuccess = await fileAdminLog(
    req.user,
    `Updated event "${updatedDoc.name}" on ${getTodaysDate()}`
  );
  // If actionsLog fails, display an error message and redirect
  if (!logSuccess) {
    req.flash('error', 'Admin not found');
    return res.redirect('/events');
  }

  console.log(`Event "${updatedEvent.name}" has been updated:`.green);
  console.log(updatedEvent);

  req.flash('success', `Event ${updatedEvent.name} has been updated.`);

  return res.redirect('/events');
};

//! Delete Event
module.exports.deleteEvent = async (req, res, next) => {
  const { id } = req.params;
  const event = await Event.findByIdAndDelete(id);
  if (!event) {
    req.flash('error', 'Event deletion failed. Event not found in database.');
    res.redirect('/events');
  }

  if (event.attendees.length > 0) {
    for (let attendee of event.attendees) {
      const deletedAttendant = await Attendant.findByIdAndDelete(attendee);
      console.log('deletedAttendant:'.yellow);
      console.log(deletedAttendant);
    }
  }

  // This deletes the relevant image in the cloudinary photo repo (if it's not the default image)
  if (event.image.filename !== 'penn-northwest-website/omcwig0tniucxrhnqnqn') {
    const filename = event.image.filename;
    await cloudinary.uploader.destroy(filename);
  }

  // Log delete action to admin actionsLog
  const logSuccess = await fileAdminLog(
    req.user,
    `Event ${event.name} Deleted on ${getTodaysDate()}`
  );

  // If actionsLog fails, display an error message and redirect
  if (!logSuccess) {
    req.flash('error', 'Admin not found');
    return res.redirect('/events');
  }

  req.flash('success', `Event "${event.name}" Successfully Deleted.`);
  res.redirect('/events');
};

//! Register Free Event
module.exports.registerFreeEvent = async (req, res, next) => {
  //Honeypot bot catcher
  if (req.body.honeypot) {
    req.flash('error', 'Bot detected. Registration cancelled.');
    res.redirect('/events');
  }

  //TODO Remove reCAPTCHA when confirmed off the page
  // Validate reCAPTCHA response
  // const captchaValidateBoolean = await validateReCaptcha(req);

  // If reCAPTCHA validation fails, display an error message and redirect to the membership application page
  // if (!captchaValidateBoolean) {
  //   req.flash(
  //     'error',
  //     'The captcha check failed to validate. Please retry the membership application, or contact us directly.'
  //   );
  //   return res.redirect('/events');
  // }

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

//   if (!Array.isArray(attendant.guestNames)) {
//   try {
//     attendant.guestNames = JSON.parse(attendant.guestNames);
//     if (!Array.isArray(attendant.guestNames)) {
//       attendant.guestNames = []; // Ensure fallback to array
//     }
//   } catch (error) {
//     attendant.guestNames = []; // Ensure fallback to array
//   }
// }

  // Creating a new Attendant document with the provided details
  const newAttendantDoc = new Attendant({
    dateTime: attendant.dateTime,
    ticketQuantity: '1',
    eventName: event.name,
    attendantName: attendant.name,
    email: attendant.email,
    event: attendant.id,
    // guestNames: attendant.guestNames,
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
    // guestNames: attendant.guestNames,
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

//! Registration Confirmation
module.exports.renderRegistrationConfirmation = async (req, res, next) => {
  const attendant = req.session.attendant;
  try {
    sendMessage(attendant);
  } catch (error) {
    req.flash('error', 'Confirmation email failed to send.');
  }

  res.render('checkout/freeRegistration', { attendant });
};
