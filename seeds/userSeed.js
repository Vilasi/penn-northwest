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

//* The following function creates a single user with randomized name/email
async function addUsers() {
  await User.deleteMany({ role: 'user' });

  const user = new User({
    email: `user${Math.floor(Math.random() * 1000)}@example.com`,
    role: 'user',
    firstName: 'John',
    lastName: 'Doe',
    company: 'Example Company',
    actionsLog: [],
    username: `username${Math.floor(Math.random() * 1000)}`,
  });

  const registeredUser = await User.register(user, 'Password1');
  console.log(registeredUser);
}

for (let i = 0; i < 15; i++) {
  addUsers().then(() => {
    console.log('user created');
  });
}

// mongoose.connection.close();

// addUsers().then(() => {
//   mongoose.connection.close();
// });
