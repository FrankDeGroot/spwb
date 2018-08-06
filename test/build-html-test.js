'use strict';

module.exports = async () => {
  const fs = require('fs');
  const path = require('path');
  const { promisify } = require('util');

  const contentDir = path.join(__dirname, 'content');
  const designDir = path.join(__dirname, 'design');
  const siteDir = path.join(__dirname, 'site');

  await require('del')(siteDir);
  await promisify(require('mkdirp'))(siteDir);

  await require('../lib/build-html')({
    contentDir: contentDir,
    designDir: designDir,
    siteDir: siteDir
  });

  const htmlFile = path.join(siteDir, 'index.html');
  if(!await promisify(fs.exists)(htmlFile)) {
    throw new Error('Expected ' + htmlFile);
  }
};
