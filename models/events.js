const mongoose = require('mongoose');
const { Schema } = mongoose;
const objectIdType = Schema.Types.ObjectId;

const imageSchema = new Schema({
  url: String,
  filename: String,
});

imageSchema.virtual('thumbnail').get(function () {
  return this.url.replace('/upload', '/upload/w_200');
});

//This ensures that the virtuals are available when converting a doc to JSON
const options = { toJSON: { virtuals: true } };

const eventSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    priceInCents: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    bulletPoints: [
      {
        type: String,
        required: true,
      },
    ],
    dates: [
      {
        type: Date,
        required: true,
      },
    ],
    times: [
      {
        type: String,
        required: true,
      },
    ],
    image: imageSchema,
    location: {
      type: String,
      required: true,
    },
    attendees: {
      type: Number,
      default: 0,
    },
    //? The below commented out attendees is saved for potential later reintegration
    // attendees: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Attendee', // Reference to the User model
    //   },
    // ],
  },
  options
);
//TODO ADD:
//? - Date
//? - Location
//? - Time
//? - Map??

//* Virtual definitions

// This virtual property will be used to retrieve a formatted price string.
eventSchema.virtual('formattedPrice').get(function () {
  // Create a new instance of Intl.NumberFormat to format currency.
  // Using 'en-US' locale for formatting.
  // Styling currency with 'USD' as the currency code.
  const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  // Calculate the price in dollars by dividing 'priceInCents' by 100,
  // since 'priceInCents' is stored in cents.
  // Format the calculated price using the currencyFormatter and return the formatted string.
  return currencyFormatter.format(this.priceInCents / 100);
});

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;
