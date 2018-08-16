'use strict';

(async () => {
  try {
    await require('./build-css-test')();
    await require('./build-html-test')();
    await require('./build-js-test')();
  } catch (e) {
    console.error(e);
    process.exitCode = 1;
  }
})();
