require('dotenv').config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const engine = require('ejs-mate');
const morgan = require('morgan');
require('express-async-errors');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');

//* Initialize Express App and Port:
const app = express();
const PORT = 3000;

//* Import Models
const User = require('./models/users');

//* Import Error Handlers
const errorHandler = require('./utils/error-handlers/errorHandler');

//* Import Routers
const membershipRoutes = require('./routes/membership');

//* Connect to MongoDB
main().catch((err) => console.log(err));
mongoose.connection.once('open', () => {
  console.log('Database Connected!');
});

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/penn-northwest');
}

//! SET VIEW ENGINE && SET EJS-Mate Template Engine
app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

//! LOAD STATIC FILES
const pathToPublic = path.join(__dirname, '/public');
//* Links up static files (CSS, JS, Bootstrap, etc)
app.use(express.static(pathToPublic));

//! Initialization Middleware
//* Allows express to be able to parse incoming JSON payloads
app.use(express.json());
//* This lets express parse the request body of POST requests
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
//* Method Override for Overriding POST requests
// override with POST having ?_method=DELETE, such that:
//[IN <FORM>]: action="http://localhost:3000/comments/<%= desiredComment.id %>?_method=PATCH"
app.use(methodOverride('_method'));

//* Morgan Logger Middleware
app.use(morgan('dev'));

app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    // rolling: true,
    cookie: {
      //One week from today
      // maxAge: Date.now() + 60480000,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      //This sets the httpOnly to true - preventing client-side scripts from gaining access to the cookie
      httpOnly: true,
    },
  })
);
app.use(flash());
//TODO------------- CONTINUE INITIALIZING PASSPORTJS
//TODO------------- CONTINUE INITIALIZING PASSPORTJS
//TODO------------- CONTINUE INITIALIZING PASSPORTJS
//TODO------------- CONTINUE INITIALIZING PASSPORTJS
//TODO------------- CONTINUE INITIALIZING PASSPORTJS
//TODO------------- CONTINUE INITIALIZING PASSPORTJS
//TODO------------- CONTINUE INITIALIZING PASSPORTJS
//TODO------------- CONTINUE INITIALIZING PASSPORTJS

//* Initialize Passport and setup User Session Serialization for storing User info in the session
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//! Routes
//* Home
app.get('/', (req, res) => {
  // console.log(req.session);
  // console.dir(User);
  res.render('pages/home');
});

app.use('/membership', membershipRoutes);

//* Jobs
app.get('/jobs', (req, res) => {
  res.render('pages/jobs');
});

//* Events
app.get('/events', (req, res) => {
  res.render('pages/events');
});

//* About
app.get('/about', (req, res) => {
  res.render('pages/about');
});

app.use((err, req, res, next) => {
  if (errorHandler.handleMongooseError('test')) {
  }
  return res.status(500).send('Error, internal server error');
});

app.listen(PORT, () => {
  console.log(`Penn-Northwest Web Server running on port: ${PORT}`);
});
