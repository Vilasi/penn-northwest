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

const eventSchema = new Schema({
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
  image: { imageSchema },
  location: {
    type: String,
    required: true,
  },
  attendees: {
    type: Number,
    default: 0,
  },
  // attendees: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: 'Attendee', // Reference to the User model
  //   },
  // ],
});
//TODO ADD:
//? - Date
//? - Location
//? - Time
//? - Map??

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;
