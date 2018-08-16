'use strict';

(async () => {
  const glob = require('globby');
  const path = require('path');
  try {
    const testFiles = await glob(path.join(__dirname, '*-test.js'));
    const config = await require('./setup')();
    for (const testFile of testFiles) {
      console.log('Running', testFile);
      await require(testFile)(config);
    }
  } catch (e) {
    console.error(e);
    process.exitCode = 1;
  }
})();
