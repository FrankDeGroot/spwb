import { remove, stat } from "fs-extra";
import * as glob from "globby";
import { Clone, Cred } from "nodegit";
import { IConfig } from "./config";

export async function cloneSite({ siteDir, siteToken, siteUrl }: IConfig) {
  const siteStats = await stat(siteDir);
  if (siteStats.isDirectory) {
    for (const path of await glob([siteDir, "!.git"])) {
      await remove(path);
    }
  } else {
    await Clone.clone(siteUrl, siteDir, {
      fetchOpts: {
        callbacks: {
          certificateCheck: () => 1,
          credentials: () =>
            Cred.userpassPlaintextNew(siteToken, "x-oauth-basic"),
        },
      },
    });
  }
}
