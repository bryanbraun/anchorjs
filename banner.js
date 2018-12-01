const fs = require('fs');
const pkg = require('./package.json');
const filename = 'anchor.min.js';
const script = fs.readFileSync(filename);
const padStart = str => ('0' + str).slice(-2)
const dateObj = new Date;
const date = `${dateObj.getFullYear()}-${padStart(dateObj.getMonth() + 1)}-${padStart(dateObj.getDate())}`;
const scriptWithBanner = `// @license magnet:?xt=urn:btih:d3d9a9a6595521f9666a5e94cc830dab83b65699&dn=expat.txt Expat
//
// AnchorJS - v${pkg.version} - ${date}
// ${pkg.homepage}
// Copyright (c) ${dateObj.getFullYear()} Bryan Braun; Licensed ${pkg.license}
//
// @license magnet:?xt=urn:btih:d3d9a9a6595521f9666a5e94cc830dab83b65699&dn=expat.txt Expat
${script}
// @license-end`;

if (script.slice(0, 2) != '//') {
  fs.writeFileSync(filename, scriptWithBanner);
}
