'use strict';

module.exports = async config => {
  const { exists } = require('./expects');

  await require('../lib/build-js')(config);

  await exists(config.siteDir, 'script.js');
};
