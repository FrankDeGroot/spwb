import { buildCssTest } from "./build-css-test";
import { buildHtmlTest } from "./build-html-test";
import { buildImagesTest } from "./build-images-test";
import { setup } from "./setup";

(async () => {
  try {
    const config = await setup();
    await buildCssTest(config);
    await buildHtmlTest(config);
    await buildImagesTest(config);
  } catch (e) {
    console.error(e);
    process.exitCode = 1;
  }
})();
