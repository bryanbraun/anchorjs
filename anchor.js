/*!
 * AnchorJS - v0.4.0 - 2015-04-20
 * https://github.com/bryanbraun/anchorjs
 * Copyright (c) 2015 Bryan Braun; Licensed MIT
 */


 /*
 @todo - See if we can make "left" into that position:absolute to the left option.
 @todo - See if I can make that "link icon override" less janky.
 */
'use strict';

function AnchorJS(options) {
  this.options = options || {};

  this._applyDefaultOptions = function(opts) {
    this.options.icon = this.options.hasOwnProperty('icon') ? opts.icon : '¶'; // Accepts characters (and also URLs?), like  '#', '¶', '❡', or '§'.
    this.options.visible = this.options.hasOwnProperty('visible') ? opts.visible : 'hover'; // Also accepts 'always'
    this.options.placement = this.options.hasOwnProperty('placement') ? opts.placement : 'right'; // Also accepts 'left'
    this.options.class = this.options.hasOwnProperty('class') ? opts.class : ''; // Accepts any class name.
  }

  this._applyDefaultOptions(options);

  // Sensible default selector, if none is provided.
  this.add = function(selector) {
    var elements,
        elsWithIds,
        idList,
        elementID,
        i,
        textMethod,
        roughText,
        tidyText,
        index,
        count = 0,
        newTidyText,
        readableID,
        anchor,
        div,
        anchorNodes;

    this._applyDefaultOptions(this.options);

    if (!selector) {
      selector = 'h1, h2, h3, h4, h5, h6';
    } else if (typeof selector !== 'string') {
      throw new Error('AnchorJS accepts only strings; you used a ' + typeof selector);
    }

    elements = document.querySelectorAll(selector);
    if (elements.length === 0) {
      return false;
    }

    this._addBaselineStyles();

    // We produce a list of existing IDs so we don't generate a duplicate.
    elsWithIds = document.querySelectorAll('[id]');
    idList = [].map.call(elsWithIds, function assign(el) {
      return el.id;
    });

    // Loop through the selected elements.
    for (i = 0; i < elements.length; i++) {
      elementID;

      if (elements[i].hasAttribute('id')) {
        elementID = elements[i].getAttribute('id');
      } else {
        // We need to create an ID on our element. First, we find which text
        // selection method is available to the browser.
        textMethod = document.body.textContent ? 'textContent' : 'innerText';

        // Get the text inside our element
        roughText = elements[i][textMethod];

        // Refine it so it makes a good ID. Strip out non-safe characters, replace
        // spaces with hyphens, truncate to 32 characters, and make toLowerCase.
        //
        // Example string:                                // "⚡⚡⚡ Unicode icons are cool--but don't belong in a URL."
        tidyText = roughText.replace(/[^\w\s-]/gi, '')    // " Unicode icons are cool--but dont belong in a URL"
                                .replace(/\s+/g, '-')     // "-Unicode-icons-are-cool--but-dont-belong-in-a-URL"
                                .replace(/-{2,}/g, '-')   // "-Unicode-icons-are-cool-but-dont-belong-in-a-URL"
                                .substring(0, 32)         // "-Unicode-icons-are-cool-but-dont"
                                .replace(/^-+|-+$/gm, '') // "Unicode-icons-are-cool-but-dont"
                                .toLowerCase();           // "unicode-icons-are-cool-but-dont"

        // Compare our generated ID to existing IDs (and increment it if needed)
        // before we add it to the page.
        newTidyText = tidyText;
        do {
          if (index !== undefined) {
            newTidyText = tidyText + '-' + count;
          }
          // .indexOf is supported in IE9+.
          index = idList.indexOf(newTidyText);
          count += 1;
        } while (index !== -1);
        index = undefined;
        idList.push(newTidyText);

        // Assign it to our element.
        // Currently the setAttribute element is only supported in IE9 and above.
        elements[i].setAttribute('id', newTidyText);

        // Grab it for use in our anchor.
        elementID = newTidyText;
      }

      readableID = elementID.replace(/-/g, ' ');

      // I should convert this vvv to using the DOM API, so I can set CSS properties
      // on it using the .style object, as described at
      // http://www.kirupa.com/html5/setting_css_styles_using_javascript.htm
      anchor = '<a class="anchorjs-link ' + this.options.class + '" href="#' + elementID + '">' +
                 '<span class="anchorjs-description">Anchor link for: ' + readableID + '</span>' +
                 '<span class="anchorjs-icon" aria-hidden="true">' + this.options.icon + '</span>' +
               '</a>';

      div = document.createElement('div');
      div.innerHTML = anchor;
      anchorNodes = div.childNodes;

      if (this.options.visible === 'always') {
        anchorNodes[0].style.opacity = '1';
      }

      if (this.options.placement === "right") {
        elements[i].appendChild(anchorNodes[0]);
      } else { // if the option provided is "left" (or anything else)
        elements[i].insertBefore(anchorNodes[0], elements[i].firstChild);
      }
    }

    return this;
  }

  this.remove = function(selector) {
    var domAnchor,
        elements = document.querySelectorAll(selector);
    for (var i = 0; i < elements.length; i++) {
      domAnchor = elements[i].querySelector('.anchorjs-link');
      elements[i].removeChild(domAnchor);
    }
    return this;
  }

  this._addBaselineStyles = function() {
    var style = document.createElement("style"),
        linkRule =
        " .anchorjs-link {"                 +
        "   opacity: 0;"                    +
        "   text-decoration: none;"         +
        " }",
        hoverRule =
        " *:hover > .anchorjs-link,"        +
        " .anchorjs-link:focus  {"          +
        "   opacity: 1;"                    +
        "   transition: color .16s linear;" +
        " }",
        screenreaderRule =
        " .anchorjs-description {"          +
        "   border: 0;"                     +
        "   clip: rect(0 0 0 0);"           +
        "   height: 1px;"                   +
        "   margin: -1px;"                  +
        "   overflow: hidden;"              +
        "   padding: 0;"                    +
        "   position: absolute;"            +
        "   width: 1px;"                    +
        " }";

    style.appendChild(document.createTextNode("")); // WebKit hack :(
    document.head.appendChild(style);
    style.sheet.insertRule(linkRule, 0);
    style.sheet.insertRule(hoverRule, 1);
    style.sheet.insertRule(screenreaderRule, 2);
  }
}

var anchors = new AnchorJS();
