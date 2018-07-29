'use strict';

const fs = require('fs');
const { basename, join } = require('path');
const { promisify } = require('util');

const glob = promisify(require('glob'));
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

module.exports = async function ({ scriptDir, siteDir }) {
  const codeFiles = {};
  for (const jsFile of await glob(join(scriptDir, '**', '*.js'))) {
    codeFiles[basename(jsFile)] = await readFile(jsFile, 'utf-8');
  }
  const Uglify = require('uglify-es');
  const minified = Uglify.minify(codeFiles);
  await writeFile(join(siteDir, 'script.js'), minified.code);
};
