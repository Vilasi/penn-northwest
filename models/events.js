const mongoose = require('mongoose');
const { Schema } = mongoose;
const objectIdType = Schema.Types.ObjectId;

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
    tierNames: [
      {
        type: String,
        required: false,
      },
    ],
    tierPrices: [
      {
        type: Number,
        required: true,
        set: (val) => Number(val),
      },
    ],
    tierTicketsIncluded: [
      {
        type: Number,
        required: true,
        set: (val) => Number(val),
      },
    ],
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
          'https://res.cloudinary.com/dypchgtip/image/upload/v1692771876/penn-northwest-website/PLACEHOLDER_IMAGE_DONT_DELETE.png',
        // omcwig0tniucxrhnqnqn --- Original filename code. Save for potential reintegration.
      },
      filename: {
        type: String,
        default: 'penn-northwest-website/omcwig0tniucxrhnqnqn',
      },
    },
    location: {
      type: String,
      required: true,
    },
    attendees: {
      type: Number,
      default: 0,
    },
    //? The below commented out attendees is saved for potential later reintegration
    attendees: [
      {
        type: mongoose.Schema.Types.ObjectId, // Keeping this verbose for later reference
        ref: 'Attendant', // Reference to the User model
      },
    ],
  },
  options
);

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

//* Dates human-readable formatting virtual property function
eventSchema.virtual('formattedDates').get(function () {
  const isoDates = this.dates.map((date) => new Date(date));
  const formattedDateArray = isoDates.map((date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'UTC',
    });
  });

  return formattedDateArray;
});

// This formats the date so that it works as a default date value in the event edit page
eventSchema.virtual('editPageFormattedDates').get(function () {
  const isoDates = this.dates.map((date) => new Date(date));
  const formattedDateArray = isoDates.map((date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      timeZone: 'UTC',
    });
  });

  const dateArrayCopy = [...formattedDateArray];
  for (let i = 0; i < dateArrayCopy.length; i++) {
    const dateValuesArray = dateArrayCopy[i].split('/');
    let year = dateValuesArray[2];
    let month = dateValuesArray[0];
    let day = dateValuesArray[1];

    if (Number(month) < 10) {
      month = `0${Number(month)}`;
    }
    if (Number(day) < 10) {
      day = `0${Number(day)}`;
    }
    console.log(year, month, day);
    dateArrayCopy[i] = `${year}-${month}-${day}`;
  }

  return dateArrayCopy;
});

//* Formats the Times from 12 hour clock to 24 hour clock
eventSchema.virtual('formattedStartTimes').get(function () {
  const times = [...this.startTimes];
  const formattedTimes = times.map((time) => {
    const hourHand = Number(time.split(':')[0]);
    const minuteHand = time.split(':')[1];

    if (hourHand === 12) {
      return `${12}:${minuteHand}PM`;
    }
    if (hourHand === 0) {
      return `${12}:${minuteHand}AM`;
    }

    if (hourHand >= 12) {
      return `${hourHand % 12}:${minuteHand} PM`;
    } else {
      return `${hourHand}:${minuteHand}AM`;
    }
  });

  return formattedTimes;
});
eventSchema.virtual('formattedEndTimes').get(function () {
  const times = [...this.endTimes];
  const formattedTimes = times.map((time) => {
    const hourHand = Number(time.split(':')[0]);
    const minuteHand = time.split(':')[1];

    if (hourHand === 12) {
      return `${12}:${minuteHand}PM`;
    }
    if (hourHand === 0) {
      return `${12}:${minuteHand}AM`;
    }

    if (hourHand >= 12) {
      return `${hourHand % 12}:${minuteHand}PM`;
    } else {
      return `${hourHand}:${minuteHand}AM`;
    }
  });

  return formattedTimes;
});

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;
