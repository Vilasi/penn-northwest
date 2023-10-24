const mongoose = require('mongoose');
const { Schema } = mongoose;
const objectIdType = Schema.Types.ObjectId;

const tokenSchema = new Schema({
  userId: {
    type: objectIdType,
    required: true,
    ref: 'User',
  },
  secret: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 3600, // this is the expiry time in seconds - one hour
  },
});

const Token = mongoose.model('Token', tokenSchema);

module.exports = Token;
