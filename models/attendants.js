const mongoose = require('mongoose');
const { Schema } = mongoose;
const objectIdType = Schema.Types.ObjectId;

const attendantSchema = new Schema({
  dateTime: {
    type: String,
    required: true,
  },
  ticketQuantity: {
    type: String,
    required: true,
  },
  eventName: {
    type: String,
    required: true,
  },
  attendantName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  sponsorship: {
    type: String,
    required: false,
  },
  event: {
    type: Schema.Types.ObjectId,
    ref: 'Event',
  },
  guestNames: {
    type: [String],
    default: [],
  },
});

const Attendant = mongoose.model('Attendant', attendantSchema);
module.exports = Attendant;
