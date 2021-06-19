'use strict';

const { start, init } = require('./server');

(async function() {
  await init();
  await start();
})();
