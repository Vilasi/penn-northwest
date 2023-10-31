//! -- Joi Data Validations
//? These validations are utilized in /utils/middleware/joiValidations.js
const BaseJoi = require('joi');
const sanitizeHtml = require('sanitize-html');

const Joi = BaseJoi.extend((joi) => {
  return {
    type: 'string',
    base: joi.string(),
    messages: {
      'string.escapeHtml': '{{#label}} must not include HTML!',
    },
    rules: {
      escapeHtml: {
        validate(value, helpers) {
          const clean = sanitizeHtml(value, {
            // The following disallows any type of html tags/attributes to be passed through user inputs
            allowedTags: [],
            allowedAttributes: {},
          });
          if (clean !== value) {
            return helpers.error('string.escapeHtml', { value });
          }
          return clean;
        },
      },
    },
  };
});

module.exports.eventSchema = Joi.object({
  name: Joi.string().escapeHtml().required(),
  priceInCents: Joi.string().escapeHtml().required(),
  description: Joi.string().escapeHtml().required(),
  bulletPoints: Joi.alternatives().try(
    Joi.array().items(Joi.string().escapeHtml()),
    Joi.string().escapeHtml()
  ),
  dates: Joi.alternatives().try(
    Joi.array().items(Joi.date().required()).required(),
    Joi.date().required()
  ),
  startTimes: Joi.alternatives().try(
    Joi.array().items(Joi.string().escapeHtml().required()).required(),
    Joi.string().escapeHtml().required()
  ),
  endTimes: Joi.alternatives().try(
    Joi.array().items(Joi.string().escapeHtml().required()).required(),
    Joi.string().escapeHtml().required()
  ),
  location: Joi.string().escapeHtml().required(),
  attendees: Joi.number().default(0),
});

module.exports.imageSchema = Joi.object({
  url: Joi.string().escapeHtml().required(),
  filename: Joi.string().escapeHtml().required(),
});

//TODO Expand Attendant Data Collection -- Waiting on CRM people
module.exports.paidEventSchema = Joi.object({
  id: Joi.string().escapeHtml().required(),
  dateTime: Joi.string().escapeHtml().required(),
  ticketQuantity: Joi.string().escapeHtml().required(),
  name: Joi.string().escapeHtml().required(),
  email: Joi.string().escapeHtml().required(),
});

module.exports.freeEventSchema = Joi.object({
  id: Joi.string().escapeHtml().required(),
  dateTime: Joi.string().escapeHtml().required(),
  ticketQuantity: Joi.string().escapeHtml().required(),
  name: Joi.string().escapeHtml().required(),
  email: Joi.string().escapeHtml().required(),
});

module.exports.registrationSchema = Joi.object({
  firstName: Joi.string().escapeHtml().required(),
  lastName: Joi.string().escapeHtml().required(),
  email: Joi.string().escapeHtml().email().required(),
  username: Joi.string().escapeHtml().min(2).required(),
  company: Joi.string().escapeHtml().required(),
  password: Joi.string().escapeHtml().min(6).required(),
});

module.exports.resetPasswordSchema = Joi.object({
  email: Joi.string().escapeHtml().email().required(),
});

module.exports.matchingPasswordSchema = Joi.object({
  password: Joi.string().escapeHtml().min(6).required(),
  password2: Joi.string().escapeHtml().min(6).required(),
});

module.exports.membershipApplicationSchema = Joi.object({
  companyName: Joi.string().escapeHtml().required(),
  website: Joi.string().escapeHtml().required(),
  representative: Joi.string().escapeHtml().required(),
  email: Joi.string().escapeHtml().email().required(),
  phone: Joi.string().escapeHtml().required(),
  address: Joi.string().escapeHtml().required(),
  city: Joi.string().escapeHtml().required(),
  state: Joi.string().escapeHtml().required(),
  zip: Joi.string().escapeHtml().required(),
  descriptionOfBusiness: Joi.string().escapeHtml().required(),
  companyType: Joi.string()
    .escapeHtml()
    .valid(
      'Private Sector',
      'Non-Profit/Charitable/Misc. Sector',
      'Public Sector'
    )
    .required(),
  affiliations: Joi.string().escapeHtml().required(),
  annualContribution: Joi.string().escapeHtml().required(),
  submittedBy: Joi.string().escapeHtml().required(),
  submitterTitle: Joi.string().escapeHtml().required(),
});

module.exports.newMemberSchema = Joi.object({
  newMember: Joi.object({
    name: Joi.string().escapeHtml().required(),
    href: Joi.string().escapeHtml().allow(null, ''),
  }),
});
