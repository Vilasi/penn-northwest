const mongoose = require('mongoose');
const { Schema } = mongoose;
const objectIdType = Schema.Types.ObjectId;

// const imageSchema = new Schema({
//   // url: {
//   //   type: String,
//   //   default:
//   //     'https://res.cloudinary.com/dypchgtip/image/upload/v1692771876/penn-northwest-website/omcwig0tniucxrhnqnqn.png',
//   // },
//   // filename: {
//   //   type: String,
//   //   default: 'penn-northwest-website/omcwig0tniucxrhnqnqn',
//   // },
//   url: String,
//   filename: String,
// });

// imageSchema.virtual('thumbnail').get(function () {
//   return this.url.replace('/upload', '/upload/w_200');
// });

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
    // times: [
    //   {
    //     type: String,
    //     required: true,
    //   },
    // ],
    startTimes: [
      {
        type: String,
        required: true,
      },
    ],
    endTimes: [
      {
        type: String,
        required: true,
      },
    ],
    image: {
      url: {
        type: String,
        default:
          'https://res.cloudinary.com/dypchgtip/image/upload/v1692771876/penn-northwest-website/omcwig0tniucxrhnqnqn.png',
      },
      filename: {
        type: String,
        default: 'penn-northwest-website/omcwig0tniucxrhnqnqn',
      },
    },
    // image: {
    //   type: imageSchema,
    //   default: {
    //     url: {
    //       type: String,
    //       default:
    //         'https://res.cloudinary.com/dypchgtip/image/upload/v1692771876/penn-northwest-website/omcwig0tniucxrhnqnqn.png',
    //     },
    //     filename: {
    //       type: String,
    //       default: 'penn-northwest-website/omcwig0tniucxrhnqnqn',
    //     },
    //   },
    // },
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
  // { typeKey: '$type' }
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

eventSchema.virtual('formattedDates').get(function () {
  const isoDates = this.dates.map((date) => new Date(date));
  const formattedDateArray = isoDates.map((date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  });
  console.log('isoDates-----------------------------------'.red);
  console.log(isoDates);
  console.log('formattedDateArray-----------------------------------'.red);
  console.log(formattedDateArray);
  return formattedDateArray;
  // return this.dates;
  // return this.dates.map((date) => {
  //   date.toLocaleDateString('en-US', {
  //     year: 'numeric',
  //     month: 'short',
  //     day: 'numeric',
  //   });
  // });
});

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;
