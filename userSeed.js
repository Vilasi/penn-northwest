const mongoose = require('mongoose');
const express = require('express');
const User = require('./models/users');

//* Connect to MongoDB
main().catch((err) => console.log(err));
mongoose.connection.once('open', () => {
  console.log('Database Connected!');
});

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/penn-northwest');
}

async function addDevAccount() {
  const user = new User({
    email: 'vilasicoding@gmail.com',
  });

  await user.save();
}

addDevAccount().then(() => {
  mongoose.connection.close();
});
