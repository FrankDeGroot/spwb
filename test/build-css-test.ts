import { buildCss } from "../lib/build-css";
import { IConfig } from "../lib/config";
import { exists } from "./expects";

export async function buildCssTest(config: IConfig) {
  await buildCss(config);
  await exists(config.siteDir, "style.css");
}
