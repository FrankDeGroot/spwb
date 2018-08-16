'use strict';

const cheerio = require('cheerio');
const fs = require('fs');
const glob = require('glob');
const mkdirp = require('mkdirp');
const path = require('path');
const showdown = require('showdown');
const { promisify } = require('util');
const converter = new showdown.Converter({
  tables: true,
  customizedHeaderId: true
});

module.exports = async function({ contentDir, designDir, siteDir }) {
  for (const mdFile of await promisify(glob)(
    path.join(contentDir, '**', '*.md')
  )) {
    await convertFile(contentDir, siteDir, designDir, mdFile);
  }
};

async function convertFile(contentDir, siteDir, designDir, mdFile) {
  const markdown = await promisify(fs.readFile)(mdFile, { encoding: 'utf-8' });
  const $ = cheerio.load(converter.makeHtml(markdown).replace(/[\r\n]/g, ''));

  const mdFragment = path.relative(contentDir, mdFile);
  const tplFile = path.join(designDir, mdFragment).replace(/\.md$/, '.js');
  const htmlFile = path.join(siteDir, mdFragment).replace(/\.md$/, '.html');
  const htmlDir = path.dirname(htmlFile);
  await require(tplFile)($, htmlDir);

  await promisify(mkdirp)(htmlDir);
  await promisify(fs.writeFile)(htmlFile, '<!DOCTYPE html>' + $.html());
}
