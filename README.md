# AnchorJS [![Build Status](https://img.shields.io/travis/bryanbraun/anchorjs/master.svg?style=flat)](https://travis-ci.org/bryanbraun/anchorjs) [![devDependency Status](https://img.shields.io/david/dev/bryanbraun/anchorjs.svg?style=flat)](https://david-dm.org/bryanbraun/anchorjs#info=devDependencies)

![AnchorJS logo](http://bryanbraun.com/sites/default/files/anchorjs_logo.png)

A tiny JavaScript utility for adding deep anchor links ([like these](http://ux.stackexchange.com/questions/36304/use-of-mouse-over-paragraph-marker-in-headlines-for-permalink)) to existing page content.

![Anchoring links](http://bryanbraun.com/sites/default/files/anchoring-links_0.png)

By default, AnchorJS displays a link icon appended to an element which is made visible on hover.

**[See the demo for an example](http://bryanbraun.github.io/anchorjs/).**

Deep links are useful for linking to specific places in online books and documentation (like, for example, this README file when rendered on the Github project page--hover over headings to see what I mean).

## Including AnchorJS
Include the anchor.js file (or alternatively anchor.min.js) in your webpage.

```html
<script src="anchor.js"></script>
```

For the default anchor link styling (demonstrated in the [demo](http://bryanbraun.github.io/anchorjs/)) you should also include anchor.css.

```html
<link rel="stylesheet" href="anchor.css">
```

Alternatively, you can provide your own styling.

## Using AnchorJS
AnchorJS provides the `addAnchors()` method for adding anchors to the page. This method accepts a selector as a parameter in the form of a string. The selector can be used to target specific elements that you want to add anchors to. Here's an example.

```js
/**
 * Example 1
 * Add anchors to all h1's on the page
 */
addAnchors('h1');

/**
 * Example 2
 * Adds anchors to elements that have been assigned the class '.anchored'
 */
addAnchors('.anchored');

/**
 * Example 3
 * Adds anchors to all h1, h2, & h3's inside a container with an ID of '#post'
 */
addAnchors('#post h1, #post h2, #post h3');

/**
 * Example 4
 * If no selector is provided, it falls back to a default selector of 'h1, h2, h3, h4, h5, h6'
 * which adds anchors to all headings.
 */
addAnchors();
```

## Compatibility
Currently Supports: IE9+ and modern browsers


## License
Licensed with the [MIT License](http://opensource.org/licenses/MIT).
