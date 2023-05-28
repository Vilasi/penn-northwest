const mongoose = require('mongoose');
const { Schema } = mongoose;

const eventSchema = new Schema({
  title: {
    type: String,
  },
  price: {
    type: Number,
  },
});
