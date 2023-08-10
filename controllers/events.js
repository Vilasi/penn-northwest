module.exports.index = async (req, res, next) => {
  res.render('pages/events');
};

module.exports.createEvent = async (req, res, next) => {
  console.log(req.body);
  res.send(req.body);
};
