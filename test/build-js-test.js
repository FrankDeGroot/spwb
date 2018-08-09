'use strict';

module.exports = async () => {
  const fs = require('fs');
  const path = require('path');
  const { promisify } = require('util');

  const scriptDir = path.join(__dirname, 'script');
  const siteDir = path.join(__dirname, 'site');

  await require('del')(siteDir);
  await promisify(require('mkdirp'))(siteDir);
  await require('../lib/build-js')({ scriptDir: scriptDir, siteDir: siteDir });

  if (!(await promisify(fs.exists)(path.join(siteDir, 'script.js')))) {
    throw new Error('Expected script.js');
  }
};
