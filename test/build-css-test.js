'use strict';

module.exports = async config => {
  const { exists } = require('./expects');

  await require('../lib/build-css')(config);

  await exists(config.siteDir, 'style.css');
};
