/* eslint-env es6, node */

'use strict';

const fs = require('fs');
const pkg = require('./package.json');

const filename = 'anchor.min.js';
const padStart = str => ('0' + str).slice(-2);
const dateObj = new Date();
const date = `${dateObj.getFullYear()}-${padStart(dateObj.getMonth() + 1)}-${padStart(dateObj.getDate())}`;

fs.readFile(filename, 'utf8', (err, data) => {
  if (err) {
    throw err;
  }

  const scriptWithBanner = `// @license magnet:?xt=urn:btih:d3d9a9a6595521f9666a5e94cc830dab83b65699&dn=expat.txt Expat
//
// AnchorJS - v${pkg.version} - ${date}
// ${pkg.homepage}
// Copyright (c) ${dateObj.getFullYear()} Bryan Braun; Licensed ${pkg.license}
//
// @license magnet:?xt=urn:btih:d3d9a9a6595521f9666a5e94cc830dab83b65699&dn=expat.txt Expat
${data}
// @license-end`;

  if (data.startsWith('//')) {
    console.log(`Banner already present in ${filename}!`);
  } else {
    fs.writeFile(filename, scriptWithBanner, 'utf8', (error) => {
      if (error) {
        throw error;
      }

      console.log(`Banner added to ${filename}!`);
    });
  }
});

