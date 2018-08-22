import { readFile, writeFile } from "fs-extra";
import * as glob from "globby";
import { basename, join } from "path";
import { minify } from "uglify-es";

export async function buildJs({ scriptDir, siteDir }) {
  const codeFiles = {};
  for (const jsFile of await glob(join(scriptDir, "**", "*.js"))) {
    codeFiles[basename(jsFile)] = await readFile(jsFile, "utf8");
  }
  const minified = minify(codeFiles);
  await writeFile(join(siteDir, "script.js"), minified.code);
}
