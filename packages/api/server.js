'use strict';

require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });

/* Start the agent before any thing else in your app */
if (process.env.IS_APM === 'true') {
  const apm = require('elastic-apm-node');
  apm.start({
    serviceName: process.env.ELASTIC_APM_SERVICE_NAME,
    secretToken: process.env.ELASTIC_APM_SECRET_TOKEN,
    serverUrl: process.env.ELASTIC_APM_SERVER_URL,
  });
}

const Hapi = require('@hapi/hapi');
const Database = require('./config/database');
const isDev = process.env.NODE_ENV === 'development';

/* configuration options for hapi */
const serverConf = {
  port: process.env.APP_PORT,
  host: process.env.APP_HOST,
  routes: {
    cors: {
      origin: process.env.ALLOWED_ORIGIN.split(','),
    },
    validate: {
      failAction: async (request, h, err) => {
        if (isDev) {
          console.log(err);
        }
        throw err;
      },
    },
  },
};

/* log error in development mode */
if (isDev) {
  serverConf.debug = { request: ['error'] };
}

/* Create hapi server */
const server = Hapi.server(serverConf);

/* initialize server with all plugins, middleware and configuration */
exports.init = async () => {
  /* connect database */
  await Database.connect();

  const plugins = require('./plugin');
  await server.register(plugins);
  await server.initialize();
  global.logger = server.logger;
  return server;
};

exports.start = async () => {
  await server.start();
  return server;
};

/**
 * Handle Unhandled Rejection
 */
process.on('unhandledRejection', err => {
  console.error(err);
  process.exit(1);
});

/**
 * Handle Uncaught Exception
 */
process.on('uncaughtException', err => {
  console.error(err, 'Uncaught exception');
  process.exit(1);
});
