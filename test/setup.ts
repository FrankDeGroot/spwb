import { mkdirp, remove } from "fs-extra";
import { join } from "path";
import { IConfig } from "../lib/config";

export async function setup(): Promise<IConfig> {
  const siteDir = join(__dirname, "site");

  await remove(siteDir);
  await mkdirp(siteDir);

  return {
    contentDir: join(__dirname, "content"),
    designDir: join(__dirname, "design"),
    scriptDir: join(__dirname, "script"),
    siteDir,
    siteToken: "",
    siteUrl: "",
    styleDir: join(__dirname, "style"),
  };
}
