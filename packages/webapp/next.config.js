require('dotenv').config();
const withOptimizedImages = require('next-optimized-images');
const webpackConfig = require('./webpack.config');

module.exports = withOptimizedImages({
  target: 'server',
  publicRuntimeConfig: {
    publicUrls: process.env.PUBLIC_URLS,
    ApiBaseUrl: process.env.API_BASE_URL,
    loginUrl: process.env.LOGIN_URL,
    imageMaxUploadSize: process.env.MAX_IMAGE_UPLOAD_SIZE,
    videoMaxUploadSize: process.env.MAX_VIDEO_UPLOAD_SIZE,
  },
  webpack(config) {
    // eslint-disable-next-line no-param-reassign
    config.resolve.alias = { ...config.resolve.alias, ...webpackConfig.alias };
    return config;
  },
});
