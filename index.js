if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const engine = require('ejs-mate');
const morgan = require('morgan');
require('express-async-errors');
const session = require('express-session');
const flash = require('connect-flash');
const colors = require('colors');
const createError = require('http-errors');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const mongoSanitize = require('express-mongo-sanitize');

//* Initialize Express App and Port:
const app = express();
const PORT = 3000;

//* Import Models
const User = require('./models/users');

//* Import Error Handlers
const errorHandler = require('./utils/error-handlers/errorHandler');

//* Import Routers
const membershipRoutes = require('./routes/membership');
const userRoutes = require('./routes/users');
const eventRoutes = require('./routes/events');

//* Connect to MongoDB
main().catch((err) => console.log(err));
mongoose.connection.once('open', () => {
  console.log('Database Connected!');
});

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/penn-northwest');
}

//* SET VIEW ENGINE && SET EJS-Mate Template Engine
app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

//* LOAD STATIC FILES
const pathToPublic = path.join(__dirname, '/public');
app.use(express.static(pathToPublic));

//* Initialization Middleware
//*----- Related blocks are separated by //? comments
//? Allows express to be able to parse incoming JSON payloads
app.use(express.json());
//? Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
//? Method Override for Overriding POST requests
// override with POST having ?_method=DELETE, such that:
//[IN <FORM>]: action="http://localhost:3000/comments/<%= desiredComment.id %>?_method=PATCH"
app.use(methodOverride('_method'));
//? Morgan Logger Middleware
app.use(morgan('dev'));
//? Express Session Middleware
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
//? Initialize connect-flash
app.use(flash());
//? Initialize Passport and setup User Session Serialization for storing User info in the session
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//* Database input sanitization
app.use(
  mongoSanitize({
    replaceWith: '_',
  })
);

//* Connect-Flash variable definitions
app.use((req, res, next) => {
  //currentUser is used for user authentication
  res.locals.currentUser = req.user || null;
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  res.locals.deleted = req.flash('deleted');
  next();
});

//* req.user logger
//! DEV ONLY - DELETE LATER
// app.use((req, res, next) => {
//   // console.log(process.env.STG_EMAIL_API_KEY);
//   if (req.user) {
//     console.log('req.user was found, [log from index.js]:'.yellow);
//     console.log(req.user);
//   }
//   next();
// });

//! Routes
//* Home
app.get('/', (req, res) => {
  res.render('pages/home');
});

app.use('/membership', membershipRoutes);
app.use('/events', eventRoutes);

//* Jobs
app.get('/jobs', (req, res) => {
  res.render('pages/jobs');
});

//* About
app.get('/about', (req, res, next) => {
  // console.dir(createError);
  return next(createError(404, 'This is a test error'));
  res.render('pages/about');
});

//* Login/Register
app.use('/', userRoutes);

//* Catchall 404
app.get('*', (req, res, next) => {
  // next();
  return next(createError(404, 'Page not found'));
});

//! ERROR Handler -----------------------------------
app.use((err, req, res, next) => {
  console.log('THE ERROR MESSAGE FOLLOWS. [From index.js error handler]'.red);
  console.log(err);
  //* Mongoose Error
  if (errorHandler.handleMongooseError(err)) {
    const err = createError(
      500,
      'Internal error. Please try your request again later.'
    );
    return res.status(err.status).render('pages/error', { err });
  }

  //*If the status was set as 404, return createError object. Else return default 500 error
  if (err.status === 404) {
    return res.status(err.status).render('pages/error', { err });
  } else {
    return res
      .status(500)
      .render('pages/error', { err: createError(500, 'Something went wrong') });
  }
});

app.listen(PORT, () => {
  console.log(`Penn-Northwest Web Server running on port: ${PORT}`);
});
