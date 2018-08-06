'use strict';

(async () => {
  await require('./build-css-test')();
  await require('./build-html-test')();
  await require('./build-js-test')();
})();
