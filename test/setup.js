'use strict';

module.exports = async () => {
  const fs = require('fs-extra');
  const path = require('path');

  const siteDir = path.join(__dirname, 'site');

  await fs.remove(siteDir);
  await fs.mkdirp(siteDir);

  return {
    contentDir: path.join(__dirname, 'content'),
    designDir: path.join(__dirname, 'design'),
    scriptDir: path.join(__dirname, 'script'),
    styleDir: path.join(__dirname, 'style'),
    siteDir: siteDir
  };
};
