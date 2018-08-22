import { buildCss } from "../lib/build-css";
import { exists } from "./expects";

export async function buildCssTest(config) {
  await buildCss(config);
  await exists(config.siteDir, "style.css");
}
