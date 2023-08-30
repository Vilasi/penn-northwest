const stripe = require('stripe')(process.env.STRIPE_TEST_SECRET_KEY);

module.exports = stripe;
