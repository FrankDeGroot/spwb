import { copy } from "fs-extra";
import * as glob from "globby";
import { join, relative } from "path";
import { IConfig } from "./config";

export async function buildImages({ contentDir, siteDir }: IConfig) {
  await copy(join(contentDir, "images"), join(siteDir, "images"));
  await copy(join(contentDir, "media"), join(siteDir, "media"));
  for (const icoFile of await glob(join(contentDir, "*.ico"))) {
    const toFile = join(siteDir, relative(contentDir, icoFile));
    await copy(icoFile, toFile);
  }
}
