const mongoose = require('mongoose');
const { Schema } = mongoose;
const objectIdType = Schema.Types.ObjectId;

const applicationSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
  },
  website: {
    type: String,
    required: true,
  },
  representative: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  zip: {
    type: String,
    required: true,
  },
  descriptionOfBusiness: {
    type: String,
    required: true,
  },
  companyType: {
    type: String,
    enum: [
      'Private Sector',
      'Non-Profit/Charitable/Misc. Sector',
      'Public Sector',
    ],
    required: true,
  },
  affiliations: {
    type: String,
  },
  annualContribution: {
    type: String,
    required: true,
  },
  dateSubmitted: {
    type: Date,
    default: Date.now(),
  },
  submittedBy: {
    type: String,
    required: true,
  },
  submitterTitle: {
    type: String,
    required: true,
  },
});

//* Dates human-readable formatting virtual property function
applicationSchema.virtual('formattedDate').get(function () {
  const isoDates = new Date(this.dateSubmitted);
  const formattedDate = isoDates.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });

  return formattedDate;
});

const Application = mongoose.model('Application', applicationSchema);

module.exports = Application;
