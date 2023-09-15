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

//* The following function creates a single user
//? If the user has already been created, it first deletes that user.
async function addDevAccount() {
  const foundUser = await User.findByUsername('vilasi');
  const foundUser2 = await User.findByUsername('a');
  if (foundUser) {
    console.log(foundUser);
    await User.findByIdAndDelete(foundUser._id);
  }
  if (foundUser2) {
    console.log(foundUser2);
    await User.findByIdAndDelete(foundUser2._id);
  }

  const foundByEmail = await User.findOne({ email: 'vilasicoding@gmail.com' });
  if (foundByEmail) {
    console.log(foundByEmail);
    await User.findByIdAndDelete(foundByEmail._id);
  }

  const user = new User({
    email: 'vilasicoding@gmail.com',
    username: 'vilasi',
    role: 'admin',
    firstName: 'Joe',
    lastName: 'Vilasi',
    company: 'Vilasi Web Consulting LLC',
  });

  const registeredUser = await User.register(
    user,
    'saBbKJna3zbYZRDFhvoKtgceQ8tlSVkHmh'
  );
  console.log(registeredUser);
}

addDevAccount().then(() => {
  mongoose.connection.close();
});
