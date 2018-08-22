import { buildJs } from "../lib/build-js";
import { exists } from "./expects";

export async function buildJsTest(config) {
  await buildJs(config);
  await exists(config.siteDir, "script.js");
}
