if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

//* Environment Setup and Config
const {
  secureCookieBoolean,
  dbURL,
  sameSitePolicy,
} = require('./config/env/index');
const corsMiddleware = require('./config/cors/index');

//* Import Dependencies
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const engine = require('ejs-mate');
const morgan = require('morgan');
require('express-async-errors');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const colors = require('colors');
const createError = require('http-errors');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const allowedSources = require('./config/content-security-policy/index');

//* Initialize Express App and Port:
const app = express();
const PORT = 3000;

//* Import Models
const User = require('./models/users');
const Resource = require('./models/resources');

//* Import Error Handlers
const errorHandler = require('./utils/error-handlers/errorHandler');

//* Import Routers
const membershipRoutes = require('./routes/membership');
const userRoutes = require('./routes/users');
const eventRoutes = require('./routes/events');
const adminRoutes = require('./routes/admin');

//* Connect to MongoDB
main().catch((err) => console.log(err));
mongoose.connection.once('open', () => {
  console.log('Database Connected!');
});

//? Connect to Database
async function main() {
  await mongoose.connect(dbURL);
}

//* SET VIEW ENGINE && SET EJS-Mate Template Engine
app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

//* LOAD STATIC FILES
const pathToPublic = path.join(__dirname, '/public');
app.use(express.static(pathToPublic));

//* Parse incoming JSON payloads
app.use(express.json());

//* Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

//* Method Override for Overriding POST requests
// override with POST having ?_method=DELETE, such that:
//[IN <FORM>]: action="http://localhost:3000/comments/<%= desiredComment.id %>?_method=PATCH"
app.use(methodOverride('_method'));

//? Morgan Logger Middleware
//--When in production, only errors will be logged
process.env.NODE_ENV === 'production'
  ? app.use(
      morgan('combined', {
        skip: function (req, res) {
          return res.statusCode < 400;
        },
      })
    )
  : app.use(morgan('dev'));

//? Express Session Middleware
//-- trust proxy helps our cookie be accepted when running in a prod environment on Render, which runs through a reverse proxy
app.set('trust proxy', 1);
app.use(
  session({
    name: 'miImCp',
    secret: process.env.SECRET_KEY,
    store: MongoStore.create({
      mongoUrl: dbURL,
      dbName: process.env.DB_NAME,
      touchAfter: 24 * 60 * 60,
      crypto: {
        secret: process.env.SECRET_KEY,
      },
    }),
    resave: false,
    saveUninitialized: false,
    // rolling: true,
    cookie: {
      //One week from today (In milliseconds)
      maxAge: 7 * 24 * 60 * 60 * 1000,
      //This sets the httpOnly to true - preventing client-side scripts from gaining access to the cookie
      httpOnly: true,
      //? Same Site Documentation
      //https://datatracker.ietf.org/doc/html/draft-ietf-httpbis-rfc6265bis-03#section-4.1.2.7
      sameSite: sameSitePolicy,
      //! NOTE! The below forces the cookie to only work over https
      secure: secureCookieBoolean,
    },
  })
);

//* Initialize connect-flash messages
app.use(flash());

//* Initialize CORS
app.use('*', corsMiddleware);

//* Initialize Helmet HTTP Header Package - setup allowed Content Security Policy
app.use(helmet());

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: [
        'https://www.youtube.com/',
        'https://www.google.com/',
        'https://app.mapstechnologies.com/',
        'https://heyzine.com/',
        'https://www.google.com/recaptcha/',
      ],
      frameSrc: [
        'https://www.youtube.com/',
        'https://docs.google.com/',
        'https://heyzine.com/',
        'https://app.mapstechnologies.com/',
        'https://www.google.com/recaptcha/',
        'https://play.google.com/',
        'https://www.gstatic.com/',
      ],
      connectSrc: [
        "'self'",
        ...allowedSources.connectSrcUrls,
        'https://play.google.com/',
      ],
      scriptSrc: ["'unsafe-inline'", "'self'", ...allowedSources.scriptSrcUrls],
      styleSrc: ["'self'", "'unsafe-inline'", ...allowedSources.styleSrcUrls],
      workerSrc: ["'self'", 'blob:'],
      objectSrc: [],
      imgSrc: ["'self'", 'blob:', 'data:', ...allowedSources.imgSrcUrls],
      fontSrc: ["'self'", ...allowedSources.fontSrcUrls],
      formAction: [
        "'self'",
        'https://checkout.stripe.com/',
        process.env.SERVER_URL,
        `${process.env.SERVER_URL}/events/create-checkout-session`,
      ],
    },
  })
);

console.log('The following is the env server URL:'.yellow);
console.log(process.env.SERVER_URL);

//* Initialize PassportJS and setup User Session Serialization for storing User info in the session
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

//* Connect-Flash message variable definitions
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
// if (process.env.NODE_ENV !== 'production') {
//   app.use((req, res, next) => {
//     console.log(
//       'DEV LOGGER========================================index.js--Line-161========================'
//         .red
//     );
//     // console.log(process.env.STG_EMAIL_API_KEY);
//     console.log(req.session);
//     // if (req.user) {
//     //   console.log('req.user was found, [log from index.js]:'.yellow);
//     //   console.log(req.user);

//     //   console.log('below is the req.session'.yellow);
//     //   console.log(req.session);
//     // }

//     console.log(
//       'END-DEV-LOGGER=================================================================================='
//         .red
//     );
//     next();
//   });
// }

//! Routes

//TODO Add robots.txt route.
//Text file to allow search engines to access all parts of the site:
//User-agent: *
// Disallow:

//* Home
app.get('/', (req, res) => {
  res.render('pages/home');
});

app.use('/events', eventRoutes);
app.use('/membership', membershipRoutes);

//* Jobs
app.get('/jobs', (req, res) => {
  res.render('pages/jobs');
});

//* About
app.get('/about', (req, res, next) => {
  // console.dir(createError);
  // return next(createError(404, 'This is a test error'));
  res.render('pages/about');
});

//* Services
app.get('/services', (req, res) => {
  res.render('pages/services');
});

//* Resources
app.get('/resources', async (req, res) => {
  try {
    const resources = await Resource.find({}).sort({ createdAt: -1 });
    res.render('pages/resources', { resources });
  } catch (error) {
    console.error('Error fetching resources:', error);
    res.render('pages/resources', { resources: [] });
  }
});

//* Admin
app.use('/admin', adminRoutes);

//* Login/Register
app.use('/', userRoutes);

//* Catchall 404
app.get('*', (req, res, next) => {
  // next();
  console.log(req.originalUrl);
  return next(createError(404, 'Page not found'));
});

//! ERROR Handler -----------------------------------
app.use((err, req, res, next) => {
  if (err.status !== 404) {
    console.log('Client Error:');
    console.log(err);
    console.log(`Error Status`);
    console.log(err.status);
  }
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
