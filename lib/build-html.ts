import { load } from "cheerio";
import { mkdirp, readFile, writeFile } from "fs-extra";
import * as glob from "globby";
import { dirname, join, relative } from "path";
import { Converter } from "showdown";

const converter = new Converter({
  customizedHeaderId: true,
  tables: true,
});

export async function buildHtml({ contentDir, designDir, siteDir }) {
  for (const mdFile of await glob(join(contentDir, "**", "*.md"))) {
    await convertFile(contentDir, siteDir, designDir, mdFile);
  }
}

async function convertFile(contentDir, siteDir, designDir, mdFile) {
  const markdown = await readFile(mdFile, { encoding: "utf-8" });
  const $ = load(converter.makeHtml(markdown).replace(/[\r\n]/g, ""));

  const mdFragment = relative(contentDir, mdFile);
  const tplFile = join(designDir, mdFragment).replace(/\.md$/, ".js");
  const htmlFile = join(siteDir, mdFragment).replace(/\.md$/, ".html");
  const htmlDir = dirname(htmlFile);
  await require(tplFile)($, htmlDir);

  await mkdirp(htmlDir);
  await writeFile(htmlFile, "<!DOCTYPE html>" + $.html());
}
