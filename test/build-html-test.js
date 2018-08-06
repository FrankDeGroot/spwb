'use strict';

module.exports = async () => {
  const fs = require('fs');
  const path = require('path');
  const { promisify } = require('util');

  const contentDir = path.join(__dirname, 'content');
  const designDir = path.join(__dirname, 'design');
  const siteDir = path.join(__dirname, 'site');

  await require('del')(siteDir);
  await promisify(require('mkdirp'))(siteDir);

  await require('../lib/build-html')({
    contentDir: contentDir,
    designDir: designDir,
    siteDir: siteDir
  });

  const htmlFile = path.join(siteDir, 'index.html');
  if (!await promisify(fs.exists)(htmlFile)) {
    throw new Error('Expected ' + htmlFile);
  }

  const htmlContent = (await promisify(fs.readFile)(htmlFile));
  const expectedContent = `<!DOCTYPE html>
<html><head></head><body><h1 id="test" test="test">Test</h1>
<p>test</p></body></html>`;
  if (htmlContent != expectedContent) {
    throw new Error(htmlFile + ' was ' + htmlContent + ' expected ' + expectedContent + '.');
  }
};
