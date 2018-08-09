'use strict';

const fs = require('fs');
const { join } = require('path');
const { promisify } = require('util');

const sassRender = promisify(require('node-sass').render);
const writeFile = promisify(fs.writeFile);

module.exports = async function({ styleDir, siteDir }) {
  const cssFile = join(siteDir, 'style.css');
  const css = (await sassRender({
    file: join(styleDir, 'style.scss'),
    outFile: cssFile,
    outputStyle: 'compressed'
  })).css;
  await writeFile(cssFile, css);
};
