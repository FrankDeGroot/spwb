import { mkdirp, remove } from "fs-extra";
import { join } from "path";

export async function setup() {
  const siteDir = join(__dirname, "site");

  await remove(siteDir);
  await mkdirp(siteDir);

  return {
    contentDir: join(__dirname, "content"),
    designDir: join(__dirname, "design"),
    scriptDir: join(__dirname, "script"),
    siteDir,
    styleDir: join(__dirname, "style"),
  };
}
