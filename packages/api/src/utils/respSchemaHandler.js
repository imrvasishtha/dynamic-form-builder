const Joi = require('joi');
const _ = require('lodash');

const responseSchema = {
  /* Unhandled error response schema */
  unhandledRespSchema: Joi.any().label('Result'),

  /* Success response schema */
  successRespSchema: Joi.object({
    statusCode: Joi.number(),
    message: Joi.string(),
    data: Joi.object(),
  }).label('Result'),

  /* Error response schema */
  errorRespSchema: Joi.object({
    statusCode: Joi.number(),
    error: Joi.string(),
    message: Joi.string(),
  }).label('Result'),

  /* Bad request Error response schema */
  badRequestRespSchema: Joi.object({
    statusCode: Joi.number(),
    error: Joi.string(),
    message: Joi.string(),
    validation: Joi.object({
      source: Joi.string(),
      keys: Joi.array(),
    }),
  }).label('Result'),
};

const statusCode = function(code) {
  switch (code) {
    case 200:
      return {
        200: {
          description: 'Success',
          schema: responseSchema.successRespSchema,
        },
      };
    case 400:
      return {
        400: {
          description: 'Bad Request',
          schema: responseSchema.badRequestRespSchema,
        },
      };
    case 401:
      return {
        401: {
          description: 'Unauthorized access',
          schema: responseSchema.errorRespSchema,
        },
      };
    case 404:
      return {
        404: {
          description: 'Not Found',
          schema: responseSchema.errorRespSchema,
        },
      };
    case 500:
      return {
        500: {
          description: 'Internal server error',
          schema: responseSchema.errorRespSchema,
        },
      };
    default:
      return {
        code: {
          description: 'Unhandled Error',
          schema: responseSchema.unhandledRespSchema,
        },
      };
  }
};

module.exports = {
  responseCodes: function(codes) {
    let responseData = {};
    for (let i = 0; i < codes.length; i++) {
      responseData = _.assign(responseData, statusCode(codes[i]));
    }

    return responseData;
  },
};
