const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi); // extend Joi with joi objectId

module.exports = {
  /* create form validation */
  saveForm: Joi.object({
    formName: Joi.string().required(),
    questions: Joi.array()
      .items(
        Joi.object({
          title: Joi.string().required(),
          answerType: Joi.string().required(),
          multiChoices: Joi.array().items(Joi.string().required()),
        }),
      )
      .required(),
  }),
};
