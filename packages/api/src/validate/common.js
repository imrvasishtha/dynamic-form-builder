const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi); // extend Joi with joi objectId

module.exports = {
  /* User id validation */
  userIdSchema: Joi.object({
    id: Joi.objectId().required(),
  }),
};
