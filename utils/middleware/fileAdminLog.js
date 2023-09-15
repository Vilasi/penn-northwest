const User = require('../../models/users');
//TODO Make it so that this files the correct Admin log to the admin account, and return true.
// If any errors along the way, return false,
// Handle the true/false with a boolean detector in the controller that uses this
async function fileAdminLog(user, logMessage) {
  const admin = await User.findById(user._id);
  if (!admin) {
    return false;
  }

  admin.actionsLog.push(logMessage);
  const updatedAdminLog = await admin.save();
  console.log(
    'THESE FROM FILEADMINLOG MIDDLEWARE=================================================='
      .red
  );
  //   console.log(user);
  //   console.log(req);
  //   console.log(res);
  console.log(logMessage);
  console.log(updatedAdminLog);
  return true;
}

module.exports = fileAdminLog;
