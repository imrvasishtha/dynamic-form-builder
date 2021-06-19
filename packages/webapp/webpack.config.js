const path = require('path');

module.exports = {
  alias: {
    sharedComponents: path.resolve(__dirname, 'src/sharedComponents'),
    validation: path.resolve(__dirname, 'src/validation'),
    lib: path.resolve(__dirname, 'src/lib'),
    configuration: path.resolve(__dirname, 'src/configuration'),
    assets: path.resolve(__dirname, 'public/assets'),
    reducer: path.resolve(__dirname, 'src/reducer'),
    svg: path.resolve(__dirname, 'src/svg'),
    pages: path.resolve(__dirname, 'src/pages'),
    projectConfig: path.resolve(__dirname, 'config.js'),
    i18nConfig: path.resolve(__dirname, 'i18n.js'),
  },
};
