const FormService = require('../services/FormService');
const Boom = require('@hapi/boom');
const formService = new FormService();
const Form = require('../models/form');

class FormController {
  /**
   * This function is used to create new form in database
   * @param {Hapi request obj} request
   * @param {hapi handler} h
   */
  static async saveForm(request, h) {
    try {
      const payload = request.payload;
      const result = await formService.createForm(payload);

      return h
        .response({
          statusCode: 200,
          message: 'form created successfully',
          data: result,
        })
        .code(200);
    } catch (error) {
      request.logger.error('error in FormController.createUser', error);
      throw new Boom.Boom(error, { statusCode: 500 });
    }
  }

  /**
   * Get forms based on query builder
   * @param {*} request request payload
   * @param {*} h response handler
   */
  static async fetch(request, h) {
    try {
      request.logger.info('FormController: fetch method called!');
      const queryBuilder = await request.parsedQuery;
      const { where, options } = queryBuilder || {};
      const forms = await Form.paginate(where, options);
      request.logger.info('forms fetched successfully!');

      return h
        .response({
          statusCode: 200,
          message: 'forms fetched successfully!',
          data: forms,
        })
        .code(200);
    } catch (err) {
      request.logger.info('Error in FormController:fetch: ', err);
      throw new Boom.Boom(err, { statusCode: 500 });
    }
  }
}

module.exports = FormController;
