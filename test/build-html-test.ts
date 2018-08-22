import { readFile } from "fs-extra";
import { join } from "path";
import { buildHtml } from "../lib/build-html";
import { IConfig } from "../lib/config";
import { exists } from "./expects";

export async function buildHtmlTest(config: IConfig) {
  await buildHtml(config);

  const htmlFile = join(config.siteDir, "index.html");
  await exists(htmlFile);

  const htmlContent = await readFile(htmlFile, "utf8");
  const expectedFile = join(config.contentDir, "index.html");
  const expectedContent = await readFile(expectedFile, "utf8");
  if (htmlContent !== expectedContent) {
    throw new Error(
      htmlFile + " was " + htmlContent + " expected " + expectedContent + ".",
    );
  }
}
