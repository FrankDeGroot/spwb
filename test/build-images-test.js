'use strict';

module.exports = async config => {
  const { exists } = require('./expects');

  await require('../lib/build-images')(config);

  await exists(config.siteDir, 'file.ico');
  await exists(config.siteDir, 'images', 'image.txt');
  await exists(config.siteDir, 'images', 'folder', 'subimage.txt');
  await exists(config.siteDir, 'media', 'media.txt');
  await exists(config.siteDir, 'media', 'folder', 'submedia.txt');
};
