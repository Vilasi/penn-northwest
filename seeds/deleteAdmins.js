//* This seed file creates a single user account

const mongoose = require('mongoose');
const express = require('express');
const User = require('../models/users');

//* Connect to MongoDB
main().catch((err) => console.log(err));
mongoose.connection.once('open', () => {
  console.log('Database Connected!');
});

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/penn-northwest');
}

//* Clears the database of all admins except for the vilasi account (created in adminSees.js)
async function deleteAdmins() {
  await User.deleteMany({ role: 'admin', username: { $ne: 'vilasi' } });
}

deleteAdmins().then(() => {
  mongoose.connection.close();
});
