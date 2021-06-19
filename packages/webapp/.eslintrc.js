module.exports = {
  parser: 'babel-eslint',
  env: {
    browser: true,
    node: true,
    es6: true,
    'cypress/globals': true,
  },
  extends: [
    'eslint:recommended',
    'airbnb',
    'plugin:react/recommended',
    'plugin:jsdoc/recommended',
    'plugin:cypress/recommended',
  ],
  plugins: ['import', 'flowtype', 'jsdoc', 'cypress'],
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'jsx-a11y/label-has-for': 0,
    'jsx-a11y/label-has-associated-control': 0,
    'no-shadow': 0,
    'react/forbid-prop-types': 0,
    'jsx-a11y/no-autofocus': [
      0,
      {
        ignoreNonDOM: true,
      },
    ],
    'no-plusplus': [2, { allowForLoopAfterthoughts: true }],
    radix: 0,
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          'examples/**',
          'examples-native/**',
          '**/example/**',
          '*.js',
          '**/*.test.js',
          '**/*.stories.*',
          '**/scripts/*.js',
          '**/stories/**/*.js',
          '**/__tests__/**/*.js',
          '**/.storybook/**/*.*',
        ],
        peerDependencies: true,
      },
    ],
    'no-underscore-dangle': 'off',
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['projectConfig', './config.js'],
          ['i18nConfig', './i18n.js'],
          ['lib', './src/lib'],
          ['pages', './src/pages'],
          ['reducer', './src/reducer'],
          ['sharedComponents', './src/sharedComponents'],
          ['configuration', './src/configuration'],
          ['validation', './src/validation'],
          ['svg', './src/svg'],
        ],
        extensions: ['.ts', '.js', '.jsx', '.json'],
      },
    },
  },
};
