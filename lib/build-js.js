'use strict';

const fs = require('fs-extra');
const { basename, join } = require('path');

const glob = require('globby');

module.exports = async function({ scriptDir, siteDir }) {
  const codeFiles = {};
  for (const jsFile of await glob(join(scriptDir, '**', '*.js'))) {
    codeFiles[basename(jsFile)] = await fs.readFile(jsFile, 'utf8');
  }
  const Uglify = require('uglify-es');
  const minified = Uglify.minify(codeFiles);
  await fs.writeFile(join(siteDir, 'script.js'), minified.code);
};
