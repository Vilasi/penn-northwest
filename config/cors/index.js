//? Enable CORS package to set our headers for us
const cors = require('cors');

const corsOptions = {
  origin: [
    'https://penn-northwest.onrender.com',
    'http://localhost:3000',
    'https://checkout.stripe.com',
  ],
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
};

//* This will function as a middleware - the function call will itself return a function that we can use
module.exports = cors(corsOptions);
