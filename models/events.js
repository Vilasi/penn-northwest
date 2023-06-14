const mongoose = require('mongoose');
const { Schema } = mongoose;
const objectIdType = Schema.Types.ObjectId;

const eventSchema = new Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  date: {
    type: String,
  },
  location: {
    type: String,
  },
  time: {
    type: String,
  },
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
