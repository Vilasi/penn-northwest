const mongoose = require('mongoose');
const { Schema } = mongoose;
const objectIdType = Schema.Types.ObjectId;
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  actionsLog: [
    {
      type: String,
      required: false,
    },
  ],
  token: {
    type: String,
    required: false,
  },
});

UserSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User', UserSchema);

module.exports = User;
