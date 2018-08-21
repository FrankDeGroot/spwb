'use strict';

module.exports = async function(config) {
  const {
    contentDir,
    designDir,
    scriptDir,
    styleDir,
    siteDir,
    siteToken,
    siteUrl
  } = config;
  if (
    !contentDir ||
    !designDir ||
    !scriptDir ||
    !styleDir ||
    !siteDir ||
    !siteToken ||
    !siteUrl
  ) {
    throw new Error(
      'Need values for contentDir, designDir, scriptDir, styleDir, siteDir, token, url to build.'
    );
  }
  await require('./clone-site')(config);
  await require('del')([siteDir, '!.git']);
  await require('./build-images')(config);
  await require('./build-js')(config);
  await require('./build-css')(config);
  await require('./build-html')(config);
};
