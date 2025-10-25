//* This file configures cloudinary
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const express = require('express');
const multer = require('multer');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'penn-northwest-website',
    allowedFormats: ['jpg', 'jpeg', 'png'],
  },
});

// Storage configuration for resource files (PDFs, documents, etc.)
const resourceStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    // Get filename without extension and extension separately
    const originalName = file.originalname;
    const lastDotIndex = originalName.lastIndexOf('.');
    const nameWithoutExt = originalName.substring(0, lastDotIndex).replace(/[^a-zA-Z0-9-_]/g, '_');
    const extension = originalName.substring(lastDotIndex); // includes the dot
    
    return {
      folder: 'penn-northwest-website/resources',
      allowedFormats: ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'txt'],
      resource_type: 'raw',
      // Include extension in public_id so Cloudinary serves it correctly
      public_id: `${nameWithoutExt}_${Date.now()}${extension}`,
      use_filename: true,
    };
  },
});

module.exports = { cloudinary, storage, resourceStorage };
