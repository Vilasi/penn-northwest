//* This seed file creates a single user account

const mongoose = require('mongoose');
const express = require('express');
const Membership = require('../models/memberships');

//* Connect to MongoDB
main().catch((err) => console.log(err));
mongoose.connection.once('open', () => {
  console.log('Database Connected!');
});

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/penn-northwest');
}

async function addSeedMember() {
  await Membership.deleteMany({});
  const newMember = new Membership({
    companyName: 'Example Company',
    website: 'http://www.example.com',
    representative: 'John Doe',
    email: 'john.doe@example.com',
    phone: '123-456-7890',
    address: '123 Main Street',
    city: 'Example City',
    state: 'Example State',
    zip: '12345',
    descriptionOfBusiness: 'This is an example description.',
    companyType: 'Private Sector',
    affiliations: 'Example affiliations',
    annualContribution: '$1000',
    submittedBy: 'Jane Smith',
    submitterTitle: 'Manager',
  });

  console.log(newMember);
  //   console.log('Member Application Database Cleared and Seeded'.green);
  await newMember.save();
}

addSeedMember().then(() => {
  mongoose.connection.close();
});
