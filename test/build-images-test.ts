import { buildImages } from "../lib/build-images";
import { exists } from "./expects";

export async function buildImagesTest(config) {
  await buildImages(config);

  await exists(config.siteDir, "file.ico");
  await exists(config.siteDir, "images", "image.txt");
  await exists(config.siteDir, "images", "folder", "subimage.txt");
  await exists(config.siteDir, "media", "media.txt");
  await exists(config.siteDir, "media", "folder", "submedia.txt");
}
