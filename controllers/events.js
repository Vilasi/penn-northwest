const multer = require('multer');
const { cloudinary, storage } = require('../cloudinary');
const upload = multer({ storage });

//* Import db models
const Event = require('../models/events');

module.exports.index = async (req, res, next) => {
  res.render('pages/events');
};

module.exports.createEvent = async (req, res, next) => {
  // TODO -- convert price to price in cents
  // TODO -- build event object
  // TODO Handle req.file photo storage on document
  const newEvent = req.body.event;

  //If an image was uploaded, set it on newEvent
  if (req.file) {
    const images = {
      url: req.file.path,
      filename: req.file.filename,
    };
    newEvent.image = images;
  }

  console.log('newEvent----------------------------------------------'.red);
  console.log(newEvent);

  const amountInCents = Number(newEvent.price) * 100;
  const amount = amountInCents / 100;

  console.log('Below are the prices--------------------------------------'.red);

  console.log('amount --------------------------------------'.red);
  console.log(amount);

  console.log('amount in cents--------------------------------------'.red);
  console.log(amountInCents);

  const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });
  const formattedCurrency = currencyFormatter.format(amount);
  console.log('formatted currency--------------------------------------'.red);
  console.log(formattedCurrency);

  // console.log(newEvent.price);
  // console.log(typeof newEvent.price);
  // console.log(typeof parseInt(newEvent.price));
  // console.log(parseInt(newEvent.price));

  // console.log('REQ.BODY-------------------------------------------'.red);
  // console.log(req.body);
  // console.log('REQ.FILE-------------------------------------------'.red);
  // console.log(req.file);

  res.send(req.body);
};
