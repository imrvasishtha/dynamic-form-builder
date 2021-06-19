'use strict';
const jwksRsa = require('jwks-rsa');
const Pack = require('./package.json');

/**
 * Create plugin array with different-different plugin for register in server
 */
let plugins = [
  {
    plugin: require('hapi-auth-jwt2'),
  },
  {
    plugin: require('hapi-pino'),
    options: {
      ignorePaths: process.env.IGNORE_URLS_LOG.split(',') || [],
      logPayload: process.env.LOG_PAYLOAD === 'true',
      prettyPrint: {
        translateTime: "yyyy-mm-dd'T'HH:MM:ss.l",
      },
      logRequestStart: process.env.LOG_REQUEST_START === 'true',
      logRequestComplete: process.env.LOG_REQUEST_COMPLETE === 'true',
      logEvents: [
        'response',
        'onPostStart',
        'onRequest',
        'log',
        'onPostStop',
        'request',
      ],
    },
  },
  {
    plugin: require('hapi-api-version'),
    options: {
      validVersions: process.env.VALID_API_VERSIONS.split(','),
      defaultVersion: Number(process.env.DEFAULT_API_VERSION),
      vendorName: 'dynamic-form-builder',
    },
  },
];

/**
 * Implement swagger for api documentation
 * Set schemes ['http','https'] for options
 * Host is base url retrieve from env files
 * Grouping by tag name
 * If you want to configure auth in swagger uncomment securityDefinitions
 */
const swaggerOption = {
  schemes: ['http', 'https'],
  host: process.env.APP_BASE_URL,
  grouping: 'tags',
  expanded: 'none',
  tags: [],
  info: {
    title: 'API Documentation',
    version: Pack.version,
  },
  securityDefinitions: {
    AUTH0_TOKEN: {
      description: 'Auth0 jwt token use for api authentication',
      type: 'apiKey',
      name: 'Authorization',
      in: 'header',
    },
  },
};

/**
 * concat plugins array with new plugin
 */
plugins = plugins.concat([
  {
    plugin: require('@hapi/inert'),
  },
  {
    plugin: require('@hapi/vision'),
  },
  {
    plugin: require('hapi-swagger'),
    options: swaggerOption,
  },
  {
    plugin: require('hapi-query-builder'),
    options: {
      defaultLimit: process.env.INIT_RECORD,
    },
  },
]);

/**
 * Register all routes in plugins
 * Simply add new routes in routes/index.js file for routing.
 */
const routes = require('./src/routes/index');
plugins = plugins.concat(routes);

module.exports = plugins;
