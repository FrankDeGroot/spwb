import { writeFile } from "fs-extra";
import { render } from "node-sass";
import { join } from "path";
import { promisify } from "util";
import { IConfig } from "./config";

const sassRender = promisify(render);

export async function buildCss({ styleDir, siteDir }: IConfig) {
  const cssFile = join(siteDir, "style.css");
  const css = (await sassRender({
    file: join(styleDir, "style.scss"),
    outFile: cssFile,
    outputStyle: "compressed",
  })).css;
  await writeFile(cssFile, css);
}
