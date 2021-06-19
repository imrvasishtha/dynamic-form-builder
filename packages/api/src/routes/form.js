const FormController = require('../controllers/FormController');
const FormSchema = require('../validate/form');
const { responseCodes } = require('../utils/respSchemaHandler');

module.exports = {
  plugin: {
    async register(server, options) {
      server.route([
        {
          method: 'POST',
          path: '/',
          options: {
            plugins: {
              'hapi-swagger': {
                responses: responseCodes([200, 400, 401, 404, 500]),
              },
            },
            tags: ['api', 'Form'],
            pre: [],
            auth: false,
            validate: { payload: FormSchema.saveForm },
            handler: FormController.saveForm,
            description: `To save new form`,
          },
        },
      ]);

      server.route([
        {
          method: 'GET',
          path: '/',
          options: {
            plugins: {
              'hapi-swagger': {
                security: [
                  {
                    AUTH0_TOKEN: [],
                  },
                ],
                responses: responseCodes([200, 400, 401, 404, 500]),
              },
            },
            auth: false,
            validate: {},
            tags: ['api', 'Form'],
            handler: FormController.fetch,
            description: 'To get forms',
          },
        },
      ]);
    },
    version: process.env.API_VERSION,
    name: 'form',
  },
};
