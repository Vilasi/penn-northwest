const User = require('../../models/users');

/**
 * Logs an action performed by an admin user and updates their actions log.
 *
 * @param {object} user - The admin user performing the action.
 * @param {string} logMessage - The message describing the action to be logged.
 * @returns {Promise<boolean>} - A Promise that resolves to `true` if the action is logged successfully,
 *                                or `false` if the admin user is not found.
 * @throws {Error} - If an error occurs during the database operation.
 */
async function fileAdminLog(user, logMessage) {
  const admin = await User.findById(user._id);
  if (!admin) {
    return false;
  }

  admin.actionsLog.push(logMessage);
  const updatedAdminLog = await admin.save();
  if (!updatedAdminLog) {
    console.log('The admin log was unable to save.');
    return false;
  }

  return true;
}

module.exports = fileAdminLog;
