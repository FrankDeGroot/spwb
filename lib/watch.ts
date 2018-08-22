import { watch } from "fs";
import { build } from "./build";
import { buildCss } from "./build-css";
import { buildHtml } from "./build-html";
import { buildImages } from "./build-images";
import { buildJs } from "./build-js";
import { IConfig } from "./config";

export async function watchAll(config: IConfig) {
  await build(config);

  const options = {
    recursive: true,
  };

  const { contentDir, designDir, scriptDir, styleDir } = config;

  watch(contentDir, options, async (event, filename) => {
    console.log(event, filename);
    if (filename.endsWith("md")) {
      await buildHtml(config);
    } else {
      await buildImages(config);
    }
  });

  watch(designDir, options, async (event, filename) => {
    console.log(event, filename);
    await buildHtml(config);
  });

  watch(scriptDir, options, async (event, filename) => {
    console.log(event, filename);
    await buildJs(config);
  });

  watch(styleDir, options, async (event, filename) => {
    console.log(event, filename);
    await buildCss(config);
  });
}
