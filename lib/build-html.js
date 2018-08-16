'use strict';

const cheerio = require('cheerio');
const fs = require('fs-extra');
const glob = require('globby');
const path = require('path');
const showdown = require('showdown');
const converter = new showdown.Converter({
  tables: true,
  customizedHeaderId: true
});

module.exports = async ({ contentDir, designDir, siteDir }) => {
  for (const mdFile of await glob(path.join(contentDir, '**', '*.md'))) {
    await convertFile(contentDir, siteDir, designDir, mdFile);
  }
};

async function convertFile(contentDir, siteDir, designDir, mdFile) {
  const markdown = await fs.readFile(mdFile, { encoding: 'utf-8' });
  const $ = cheerio.load(converter.makeHtml(markdown).replace(/[\r\n]/g, ''));

  const mdFragment = path.relative(contentDir, mdFile);
  const tplFile = path.join(designDir, mdFragment).replace(/\.md$/, '.js');
  const htmlFile = path.join(siteDir, mdFragment).replace(/\.md$/, '.html');
  const htmlDir = path.dirname(htmlFile);
  await require(tplFile)($, htmlDir);

  await fs.mkdirp(htmlDir);
  await fs.writeFile(htmlFile, '<!DOCTYPE html>' + $.html());
}
