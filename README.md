# Single Page Website Builder
Builder for Single Page Websites on GitHub from Markdown source with custom HTML transformations.

# Usage

Run a build with:
```JavaScript
require('spwb').build({
  contentDir: '<dir to html files>',
  designDir: '<dir to js files to transform html files using cheerio>',
  scriptDir: '<dir to js files to bundle and minify>',
  styleDir: '<dir to scss files to bundle and minify>',
  siteDir: '<dir to clone GitHub-website to>',
  siteToken: '<GitHub Personal Access Token with public_repo scope>',
  siteUrl: '<URL to personal GitHub-website like https://github.com/<User>/<User>.github.io/>'
});
```

Watch and build with:
```JavaScript
require('spwb').watch({...});
```
