const mongoose = require('mongoose');
const { Schema } = mongoose;
const objectIdType = Schema.Types.ObjectId;

const memberSchema = new Schema({
  name: {
    type: String,
  },
  href: {
    type: String,
  },
});
