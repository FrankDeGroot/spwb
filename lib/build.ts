import { buildCss } from "./build-css";
import { buildHtml } from "./build-html";
import { buildImages } from "./build-images";
import { buildJs } from "./build-js";
import { cloneSite } from "./clone-site";

export async function build(config) {
  const {
    contentDir,
    designDir,
    scriptDir,
    styleDir,
    siteDir,
    siteToken,
    siteUrl,
  } = config;
  if (
    !contentDir ||
    !designDir ||
    !scriptDir ||
    !styleDir ||
    !siteDir ||
    !siteToken ||
    !siteUrl
  ) {
    throw new Error(
      "Need values for contentDir, designDir, scriptDir, styleDir, siteDir, token, url to build.",
    );
  }
  await cloneSite(config);
  await buildImages(config);
  await buildJs(config);
  await buildCss(config);
  await buildHtml(config);
}
