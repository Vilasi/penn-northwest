const mongoose = require('mongoose');
const { Schema } = mongoose;
const objectIdType = Schema.Types.ObjectId;

const applicationSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
  },
  companyWebsite: {
    type: String,
    required: true,
  },
  representative: {
    type: String,
    required: true,
  },
  representativeTitle: {
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
  applicantPrimaryActivity: {
    type: String,
    required: true,
  },
  membershipRequest: {
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
    type: Number,
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
