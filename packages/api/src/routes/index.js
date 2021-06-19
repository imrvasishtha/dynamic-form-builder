const version = `/v${process.env.DEFAULT_API_VERSION}`;
const routes = [
  {
    plugin: require('./form'),
    routes: {
      prefix: `${version}/form`,
    },
  },
];

module.exports = routes;
