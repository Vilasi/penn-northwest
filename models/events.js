const mongoose = require('mongoose');
const { Schema } = mongoose;
const objectIdType = Schema.Types.ObjectId;

const eventSchema = new Schema({
  title: {
    type: String,
  },
  price: {
    type: Number,
  },
});
