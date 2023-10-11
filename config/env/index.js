//* Env Variable Setup for Prod vs Dev

//? Database URI Setup
const dbURL = `${
  process.env.NODE_ENV === 'production'
    ? process.env.DB_URL
    : `mongodb://127.0.0.1:27017/${process.env.DB_NAME}`
}`;

//? Cookie Security
const secureCookieBoolean =
  process.env.NODE_ENV === 'production' ? true : false;

//? SameSite Policy
const sameSitePolicy = process.env.NODE_ENV === 'production' ? 'none' : 'lax';

module.exports = {
  secureCookieBoolean,
  dbURL,
  sameSitePolicy,
};
