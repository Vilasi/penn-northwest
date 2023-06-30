const path = require('path');

module.exports.renderMembershipPage = (req, res) => {
  res.render('pages/membership');
};

module.exports.getMembershipBrochure = async (req, res, next) => {
  //? These resolve the root directory of the project and then joins that to the location of the pdf
  const rootDir = path.resolve(__dirname, '../');
  const filePath = path.join(
    rootDir,
    '/public/assets/pdf/membership-brochure.pdf'
  );

  return res.sendFile(filePath);
};
module.exports.getLevelsBrochure = async (req, res, next) => {
  //? These resolve the root directory of the project and then joins that to the location of the pdf
  const rootDir = path.resolve(__dirname, '../');
  const filePath = path.join(
    rootDir,
    '/public/assets/pdf/membership-levels.pdf'
  );

  return res.sendFile(filePath);
};
