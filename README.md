AnchorJS
========

<img alt="AnchorJS logo" src="http://bryanbraun.com/sites/default/files/anchorjs_logo.png" />

A tiny javscript utility for adding anchor links to page content.

The default anchor looks like a link icon appended to an element and made visible on hover. [See the demo for an example](http://bryanbraun.github.io/anchorjs/). This pattern is found most often in online books and documentation (like, for example, this README file when rendered on the Github project page--hover over headings to see what I mean).

Including AnchorJS
------------------
Include the anchor.js file (or alternatively anchor.min.js) in your webpage.

    <script type="text/javascript" src="anchor.js"></script>

For the default anchor link styling (demonstrated in the [demo](http://bryanbraun.github.io/anchorjs/)) you should also include anchor.css.

    <link rel="stylesheet" href="anchor.css">

Alternatively, you can provide your own styling.

Using AnchorJS
------------------
AnchorJS provides the `addAnchors()` method for adding anchors to the page. This method accepts a selector as a parameter in the form of a string. The selector can be used to target specific elements that you want to add anchors to.Here's an example.

    /**
     * Example 1
     * Add anchors to all h1's on the page 
     */
    addAnchors('h1');
    
    /**
     * Example 2
     * Adds anchors to elements containing the class '.anchored'
     */
    addAnchors('.anchored');

    /**
     * Example 3
     * If no selector is provided, it falls back to a default selector of 'h1, h2, h3, h4, h5, h6'
     * which adds anchors to all headings.
     */
    addAnchors();

Compatibility
-------------
Currently Supports: IE9+ and modern browsers


License
-------
Licensed with the [MIT License](http://opensource.org/licenses/MIT).
