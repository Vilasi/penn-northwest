const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const engine = require('ejs-mate');
const morgan = require('morgan');
require('express-async-errors');
const app = express();
const PORT = 3000;

//* Connect to MongoDB
main()
  .then(() => {
    console.log('Mongoose Database Connection Open!');
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/test');
}

//! SET VIEW ENGINE || SET EJS-Mate Template Engine
app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

//! LOAD STATIC FILES
const pathToPublic = path.join(__dirname, '/public');
//* Links up static files (CSS, JS, Bootstrap, etc)
app.use(express.static(pathToPublic));

//! MIDDLEWARE
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

app.get('/', (req, res) => {
  // res.send('Welcome to the Penn Northwest Site!');
  res.render('landing');
});

app.listen(PORT, () => {
  console.log(`Penn-Northwest Web Server running on port: ${PORT}`);
});
