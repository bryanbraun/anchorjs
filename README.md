# AnchorJS [![Build Status](https://github.com/bryanbraun/anchorjs/workflows/CI/badge.svg)](https://github.com/bryanbraun/anchorjs/actions?workflow=CI)

A JavaScript utility for adding deep anchor links ([like these](https://ux.stackexchange.com/q/36304/33248)) to existing page content. AnchorJS is lightweight, accessible, and has no dependencies.

**[See Live Examples in the Documentation](https://www.bryanbraun.com/anchorjs/#examples).**

![Anchoring links](docs/img/anchoring-links.png)

## Installation

Download AnchorJS using npm,

```bash
npm install anchor-js
```

…and then include it into your project:

```js
import AnchorJS from 'anchor-js';

const anchors = new AnchorJS();
anchors.add();
```

You could also include it in your webpage via a CDN like [CDNJS](https://cdnjs.com/libraries/anchor-js) or [jsDelivr](https://www.jsdelivr.com/package/npm/anchor-js),

```html
<script src="https://cdn.jsdelivr.net/npm/anchor-js/anchor.min.js"></script>
<script>
   anchors.add();
</script>
```

…or import it globally with ES Modules:

```js
import 'https://cdn.jsdelivr.net/npm/anchor-js/anchor.min.js';

anchors.add();
```

## Usage

See **[the Documentation](https://www.bryanbraun.com/anchorjs/#basic-usage)** for detailed instructions.

## Compatibility

Currently Supports: IE9+ and modern browsers

## Contributing

To contribute:

1. Fork/Clone the repo.
2. Make your changes (the main source file is `anchor.js`).
3. Write tests as needed.
4. Run tests locally to confirm everything is working:
   - Install test modules: Run `npm ci`
   - Run all tests: `npm test`
5. Minify and prepare the code: `npm run build`
6. Submit a Pull Request.

### Docs

The docs site (in `/docs`) is a good place to test changes visually, because it has a lot of AnchorJS examples. The site can be viewed locally by opening `/docs/index.html` in a web browser. The docs are written in plain HTML and can be edited directly.

The version of AnchorJS used in the docs (`docs-anchor.js`) is a copy of the true source file (`anchor.js`), and is unminified (for easy testing, editing, and debugging). You don't need to include changes to `docs-anchor.js` in your PR. `docs-anchor.js` is overwritten to the latest version of AnchorJS source as part of `npm run build` (which is run when publishing a new version of anchor-js).

## License

Licensed with the [MIT License](/LICENSE).
