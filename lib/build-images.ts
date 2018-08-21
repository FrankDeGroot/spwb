'use strict';

const fs = require('fs-extra');
const glob = require('globby');
const path = require('path');

module.exports = async ({ contentDir, siteDir }) => {
  await fs.copy(path.join(contentDir, 'images'), path.join(siteDir, 'images'));
  await fs.copy(path.join(contentDir, 'media'), path.join(siteDir, 'media'));
  for (const icoFile of await glob(path.join(contentDir, '*.ico'))) {
    const toFile = path.join(siteDir, path.relative(contentDir, icoFile));
    await fs.copy(icoFile, toFile);
  }
};
