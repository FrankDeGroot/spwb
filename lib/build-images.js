'use strict';

const { promisify } = require('util');
const { join } = require('path');

const copy = promisify(require('copy'));

module.exports = async function ({ contentDir, siteDir }) {
  await copy(join(contentDir, 'images', '**', '*'), join(siteDir, 'images'));
  await copy(join(contentDir, 'media', '**', '*'), join(siteDir, 'media'));
  await copy(join(contentDir, '*.ico'), siteDir);
};
