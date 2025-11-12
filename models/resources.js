const mongoose = require('mongoose');
const { Schema } = mongoose;

const resourceSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: false, // Not required if file is uploaded
    },
    file: {
      url: {
        type: String,
      },
      filename: {
        type: String,
      },
      originalName: {
        type: String,
      },
    },
    type: {
      type: String,
      required: true,
      enum: ['publication', 'video', 'podcast', 'news', 'blog'],
    },
    featured: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Resource = mongoose.model('Resource', resourceSchema);
module.exports = Resource;

