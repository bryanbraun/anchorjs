# AnchorJS [![Build Status](https://img.shields.io/travis/bryanbraun/anchorjs/master.svg?style=flat)](https://travis-ci.org/bryanbraun/anchorjs) [![devDependency Status](https://img.shields.io/david/dev/bryanbraun/anchorjs.svg?style=flat)](https://david-dm.org/bryanbraun/anchorjs#info=devDependencies)

![AnchorJS logo](http://bryanbraun.com/sites/default/files/anchorjs_logo.png)

A JavaScript utility for adding deep anchor links ([like these](http://ux.stackexchange.com/questions/36304/use-of-mouse-over-paragraph-marker-in-headlines-for-permalink)) to existing page content, with one line of code.

Deep links are most useful for linking to specific places in online books and documentation.

![Anchoring links](http://bryanbraun.com/sites/default/files/anchoring-links_0.png)

The links are highly customizable, but by default AnchorJS displays a link icon appended to an element which is made visible on hover.

**[See the demo for an example](http://bryanbraun.github.io/anchorjs/).**

## Installation

Download AnchorJS via npm:

    npm install anchor-js

or alternatively via bower:

    bower install anchor-js --save-dev

## Including AnchorJS
Include the anchor.js file (or alternatively anchor.min.js) in your webpage.

```html
<script src="anchor.js"></script>
```

To see one example of anchor link styling you can also include anchor.css.

```html
<link rel="stylesheet" href="anchor.css">
```

Alternatively, you can provide your own styling.

## Basic Usage
AnchorJS provides the `anchors` object, with methods for adding and removing anchors from the page. Each method accepts a CSS-style selector as a parameter in the form of a string (similar to jQuery). Here are some usage examples.

```js
/**
 * Example 1
 * Add anchors to all h1's on the page
 */
anchors.add('h1');

/**
 * Example 2
 * Adds anchors to elements that have been assigned the class '.anchored'
 */
anchors.add('.anchored');

/**
 * Example 3
 * If no selector is provided, it falls back to a default selector of 'h1, h2, h3, h4, h5, h6'
 * adding anchors to all headings.
 */
anchors.add();
```

You can also easily remove anchors from the page:

```js
/**
 * Example 1
 * Add anchors to all h1s, except for those with a "no-anchor" class.
 */
anchors.add('h1');
anchors.remove('.no-anchor');

/**
 * Example 2
 * Add anchors to all h1s, and remove them from sidebar h1s, by chaining methods.
 */
anchors.add('.anchored').remove('.sidebar h1');
```

## Options
You can set a number of options to customize how your anchors look:

 Option  | Accepted Values | Description
------------- | -----------  | ---------
`placement`  | `right` (default) <br> `left`  | `right` appends the anchor to the end of the element.<br> `left` places it to the left, in the margin.
`visible`  | `hover` (default) <br> `always` | `hover` displays the anchor when hovering over the element.<br> `always` will always display the anchor link.
`icon`  | (any character) | Replace the default link icon with the character(s) provided.<br> These are a few good options: `#`, `¶`, `❡`, and `§`.
`class`  | (any string) | Adds the provided class(es) to the anchor html.

```js
/**
 * Example 1
 * Add anchors to all h1s, h2s and h3s inside of #post.
 * Anchors will be always visible.
 */
anchors.options.visible = 'always';
anchors.add('#post h1, #post h2, #post h3');

/**
 * Example 2
 * Provide options as an object before adding anchors to the page.
 * Adds always-visible ¶ anchors in the left margin of each paragraph tag inside .story
 */
anchors.options = {
  placement: 'left',
  visible: 'always',
  icon: '¶'
};
anchors.add('.story > p');
```


## Compatibility
Currently Supports: IE9+ and modern browsers


## License
Licensed with the [MIT License](http://opensource.org/licenses/MIT).
