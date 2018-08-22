import { buildJs } from "../lib/build-js";
import { IConfig } from "../lib/config";
import { exists } from "./expects";

export async function buildJsTest(config: IConfig) {
  await buildJs(config);
  await exists(config.siteDir, "script.js");
}
