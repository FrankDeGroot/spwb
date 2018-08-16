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
  if (!(await promisify(fs.exists)(htmlFile))) {
    throw new Error('Expected ' + htmlFile);
  }

  const htmlContent = await promisify(fs.readFile)(htmlFile, 'utf8');
  const expectedFile = path.join(contentDir, 'index.html');
  const expectedContent = await promisify(fs.readFile)(expectedFile, 'utf8');
  if (htmlContent !== expectedContent) {
    throw new Error(
      htmlFile + ' was ' + htmlContent + ' expected ' + expectedContent + '.'
    );
  }
};
