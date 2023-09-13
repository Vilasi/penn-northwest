const stripe = require('stripe')(process.env.STRIPE_TEST_SECRET_KEY);
//TODO do this
module.exports = stripe;
