const mongoose = require('mongoose');
const { Schema } = mongoose;
const objectIdType = Schema.Types.ObjectId;

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
  listDescription: {
    type: String,
    required: true,
  },
  dates: [
    {
      type: Date,
      required: true,
    },
  ],
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
