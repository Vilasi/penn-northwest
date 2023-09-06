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
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  event: {
    type: Schema.Types.ObjectId,
    ref: 'Event',
  },
});

const Attendant = mongoose.model('PaidAttendant', attendantSchema);
module.exports = Attendant;
