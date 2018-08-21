'use strict';

module.exports = function(config) {
  require('./build')(config);

  const options = {
    recursive: true
  };

  const fs = require('fs');

  const { contentDir, designDir, scriptDir, styleDir } = config;

  fs.watch(contentDir, options, (event, filename) => {
    console.log(event, filename);
    if (filename.endsWith('md')) {
      require('./build-html')(config);
    } else {
      require('./build-images')(config);
    }
  });

  fs.watch(designDir, options, (event, filename) => {
    console.log(event, filename);
    require('./build-html')(config);
  });

  fs.watch(scriptDir, options, (event, filename) => {
    console.log(event, filename);
    require('./build-js')(config);
  });

  fs.watch(styleDir, options, (event, filename) => {
    console.log(event, filename);
    require('./build-css')(config);
  });
};
