'use strict';

module.exports = async config => {
  const fs = require('fs-extra');
  const path = require('path');
  const { exists } = require('./expects');

  await require('../lib/build-html')(config);

  const htmlFile = path.join(config.siteDir, 'index.html');
  await exists(htmlFile);

  const htmlContent = await fs.readFile(htmlFile, 'utf8');
  const expectedFile = path.join(config.contentDir, 'index.html');
  const expectedContent = await fs.readFile(expectedFile, 'utf8');
  if (htmlContent !== expectedContent) {
    throw new Error(
      htmlFile + ' was ' + htmlContent + ' expected ' + expectedContent + '.'
    );
  }
};
