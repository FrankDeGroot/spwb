'use strict';

(async () => {
    const fs = require('fs');
    const path = require('path');
    const { promisify } = require('util');

    const styleDir = path.join(__dirname, 'style');
    const siteDir = path.join(__dirname, 'site');

    await require('del')(siteDir);
    await promisify(fs.mkdir)(siteDir);
    await require('../lib/build-css')({ styleDir: styleDir, siteDir: siteDir });

    if(!await promisify(fs.exists)(path.join(siteDir, 'style.css'))) {
        throw new Error('Expected style.css');
    }
})();