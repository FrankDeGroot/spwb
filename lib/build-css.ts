import { writeFile } from "fs-extra";
import { render } from "node-sass";
import { join } from "path";
import { promisify } from "util";

const sassRender = promisify(render);

export async function buildCss({ styleDir, siteDir }) {
  const cssFile = join(siteDir, "style.css");
  const css = (await sassRender({
    file: join(styleDir, "style.scss"),
    outFile: cssFile,
    outputStyle: "compressed",
  })).css;
  await writeFile(cssFile, css);
}
