const mongoose = require('mongoose');
const { Schema } = mongoose;
const objectIdType = Schema.Types.ObjectId;

const eventSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  organizer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true,
  },
  attendees: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model
    },
  ],

  // title: {
  //   type: String,
  // },
  // description: {
  //   type: String,
  // },
  // date: {
  //   type: String,
  // },
  // location: {
  //   type: String,
  // },
  // time: {
  //   type: String,
  // },
  // image: {
  //   type: String,
  // },
});
//TODO ADD:
//? - Date
//? - Location
//? - Time
//? - Map??

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;
