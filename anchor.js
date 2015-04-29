/*!
 * AnchorJS - v0.4.0 - 2015-04-20
 * https://github.com/bryanbraun/anchorjs
 * Copyright (c) 2015 Bryan Braun; Licensed MIT
 */


function AnchorJS(options) {
  'use strict';

  this.options = options || {};

  this._applyRemainingDefaultOptions = function(opts) {
    this.options.icon = this.options.hasOwnProperty('icon') ? opts.icon : '&#xe9cb'; // Accepts characters (and also URLs?), like  '#', '¶', '❡', or '§'.
    this.options.visible = this.options.hasOwnProperty('visible') ? opts.visible : 'hover'; // Also accepts 'always'
    this.options.placement = this.options.hasOwnProperty('placement') ? opts.placement : 'right'; // Also accepts 'left'
    this.options.class = this.options.hasOwnProperty('class') ? opts.class : ''; // Accepts any class name.
  };

  this._applyRemainingDefaultOptions(options);

  this.add = function(selector) {
    var elements,
        elsWithIds,
        idList,
        elementID,
        i,
        roughText,
        tidyText,
        index,
        count = 0,
        newTidyText,
        readableID,
        anchor,
        div,
        anchorNodes;

    this._applyRemainingDefaultOptions(this.options);

    // Provide a sensible default selector, if none is given.
    if (!selector) {
      selector = 'h1, h2, h3, h4, h5, h6';
    } else if (typeof selector !== 'string') {
      throw new Error('The selector provided to AnchorJS was invalid.');
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

    for (i = 0; i < elements.length; i++) {

      if (elements[i].hasAttribute('id')) {
        elementID = elements[i].getAttribute('id');
      } else {
        roughText = elements[i].textContent;

        // Refine it so it makes a good ID. Strip out non-safe characters, replace
        // spaces with hyphens, truncate to 32 characters, and make toLowerCase.
        //
        // Example string:                                // '⚡⚡⚡ Unicode icons are cool--but don't belong in a URL.'
        tidyText = roughText.replace(/[^\w\s-]/gi, '')    // ' Unicode icons are cool--but dont belong in a URL'
                                .replace(/\s+/g, '-')     // '-Unicode-icons-are-cool--but-dont-belong-in-a-URL'
                                .replace(/-{2,}/g, '-')   // '-Unicode-icons-are-cool-but-dont-belong-in-a-URL'
                                .substring(0, 32)         // '-Unicode-icons-are-cool-but-dont'
                                .replace(/^-+|-+$/gm, '') // 'Unicode-icons-are-cool-but-dont'
                                .toLowerCase();           // 'unicode-icons-are-cool-but-dont'

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

        elementID = newTidyText;
      }

      readableID = elementID.replace(/-/g, ' ');

      anchor = '<a class="anchorjs-link ' + this.options.class + '" href="#' + elementID + '">' +
                 '<span class="anchorjs-description">Anchor link for: ' + readableID + '</span>' +
                 '<span class="anchorjs-icon" aria-hidden="true" data-anchorjs-icon="' + this.options.icon + '"></span>' +
               '</a>';

      div = document.createElement('div');
      div.innerHTML = anchor;
      anchorNodes = div.childNodes;

      if (this.options.visible === 'always') {
        anchorNodes[0].style.opacity = '1';
      }

      if (this.options.icon === '&#xe9cb') {
        anchorNodes[0].style.fontFamily = 'anchorjs-icons';
        anchorNodes[0].style.fontStyle = 'normal';
        anchorNodes[0].style.fontVariant = 'normal';
        anchorNodes[0].style.fontWeight = 'normal';
        anchorNodes[0].style.lineHeight = '1';
        anchorNodes[0].style.speak = 'none';
      }

      if (this.options.placement === 'left') {
        anchorNodes[0].style.float = 'left';
        anchorNodes[0].style.marginLeft = '-1.25em';
        elements[i].insertBefore(anchorNodes[0], elements[i].firstChild);
      } else { // if the option provided is `right` (or anything else).
        elements[i].appendChild(anchorNodes[0]);
      }
    }

    return this;
  };

  this.remove = function(selector) {
    var domAnchor,
        elements = document.querySelectorAll(selector);
    for (var i = 0; i < elements.length; i++) {
      domAnchor = elements[i].querySelector('.anchorjs-link');
      elements[i].removeChild(domAnchor);
    }
    return this;
  };

  this._addBaselineStyles = function() {
    // We don't want to add global baseline styles if they've been added before.
    if (document.head.querySelector('style.anchorjs') !== null) {
      return;
    }

    var style = document.createElement('style'),
        linkRule =
        ' .anchorjs-link {'                       +
        '   opacity: 0;'                          +
        '   text-decoration: none;'               +
        '   -webkit-font-smoothing: antialiased;' +
        '   -moz-osx-font-smoothing: grayscale;'  +
        ' }',
        hoverRule =
        ' *:hover > .anchorjs-link,'              +
        ' .anchorjs-link:focus  {'                +
        '   opacity: 1;'                          +
        ' }',
        screenreaderRule =
        ' .anchorjs-description {'                +
        '   border: 0;'                           +
        '   clip: rect(0 0 0 0);'                 +
        '   height: 1px;'                         +
        '   margin: -1px;'                        +
        '   overflow: hidden;'                    +
        '   padding: 0;'                          +
        '   position: absolute;'                  +
        '   width: 1px;'                          +
        ' }',
        anchorjsLinkFontFace =
        ' @font-face {'                           +
        '   font-family: "anchorjs-icons";'       +
        '   font-style: normal;'                  +
        '   font-weight: normal;'                 +
        '   src: url(data:application/x-font-ttf;charset=utf-8;base64,AAEAAAALAIAAAwAwT1MvMg8SBvUAAAC8AAAAYGNtYXAWitPtAAABHAAAAExnYXNwAAAAEAAAAWgAAAAIZ2x5Zutcv3cAAAFwAAABOGhlYWQFlHU0AAACqAAAADZoaGVhB3QExgAAAuAAAAAkaG10eAcAAUYAAAMEAAAAFGxvY2EAKACwAAADGAAAAAxtYXhwAAgAVwAAAyQAAAAgbmFtZVcZpu4AAANEAAABRXBvc3QAAwAAAAAEjAAAACAAAwQAAZAABQAAApkCzAAAAI8CmQLMAAAB6wAzAQkAAAAAAAAAAAAAAAAAAAABEAAAAAAAAAAAAAAAAAAAAABAAADpywPA/8AAQAPAAEAAAAABAAAAAAAAAAAAAAAgAAAAAAACAAAAAwAAABQAAwABAAAAFAAEADgAAAAKAAgAAgACAAEAIOnL//3//wAAAAAAIOnL//3//wAB/+MWOQADAAEAAAAAAAAAAAAAAAEAAf//AA8AAQAAAAAAAAAAAAIAADc5AQAAAAABAAAAAAAAAAAAAgAANzkBAAAAAAEAAAAAAAAAAAACAAA3OQEAAAAAAgFGACsDsgL/ACsAVAAAASImJyY0PwE+ATMyFhcWFA8BBiInJjQ/ATY0Jy4BIyIGDwEGFBcWFAcOASMDIiYnJjQ/ATYyFxYUDwEGFBceATMyNj8BNjQnJjQ3NjIXFhQPAQ4BIwJIBw4FNDSLGUAkI0AZNDQ/Cx8LCws/Hh4OJRQVJQ6LHh4LCwYOB4UkQBk0ND8LIAsLC0AeHg4lFRQlDoseHgsLCyALMzOLGUEjATsGBTSTM4sZGxsZM5M0PwsLCx8LQB1UHg4QEA6LHlQdCyALBQb+8BsZM5M0PwsLCx8LQB1UHg4QEA6LHlQdCyALCws0kzOLGRsAAAAAAQAAAAEAAEWYnzxfDzz1AAsEAAAAAADRYhicAAAAANFiGJwAAAAAA7IC/wAAAAgAAgAAAAAAAAABAAADwP/AAAAFAAAAAAADsgABAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAIAAAAFAAFGAAAAAAAKABQAHgCcAAEAAAAFAFUAAgAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAOAK4AAQAAAAAAAQAOAAAAAQAAAAAAAgAOAEcAAQAAAAAAAwAOACQAAQAAAAAABAAOAFUAAQAAAAAABQAWAA4AAQAAAAAABgAHADIAAQAAAAAACgA0AGMAAwABBAkAAQAOAAAAAwABBAkAAgAOAEcAAwABBAkAAwAOACQAAwABBAkABAAOAFUAAwABBAkABQAWAA4AAwABBAkABgAOADkAAwABBAkACgA0AGMAaQBjAG8AbQBvAG8AbgBWAGUAcgBzAGkAbwBuACAAMQAuADAAaQBjAG8AbQBvAG8Abmljb21vb24AaQBjAG8AbQBvAG8AbgBSAGUAZwB1AGwAYQByAGkAYwBvAG0AbwBvAG4ARgBvAG4AdAAgAGcAZQBuAGUAcgBhAHQAZQBkACAAYgB5ACAASQBjAG8ATQBvAG8AbgAuAAAAAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=) format("truetype");' +
        ' }',
        pseudoElContent =
        ' [data-anchorjs-icon]:before {'          +
        '   content: attr(data-anchorjs-icon);'   +
        ' }',
        firstStyleEl;

    style.className = 'anchorjs'; // I should check on the cross-browser compatibility of this.
    style.appendChild(document.createTextNode('')); // Necessary for Webkit.

    // We place it in the head with the other style tags, if possible, so as to
    // not look out of place. We insert before the others so these styles can be
    // overridden if necessary.
    firstStyleEl = document.head.getElementsByTagName('style')[0];
    if (firstStyleEl === undefined) {
      document.head.appendChild(style);
    } else {
      document.head.insertBefore(style, firstStyleEl);
    }

    style.sheet.insertRule(linkRule, style.sheet.cssRules.length);
    style.sheet.insertRule(hoverRule, style.sheet.cssRules.length);
    style.sheet.insertRule(screenreaderRule, style.sheet.cssRules.length);
    style.sheet.insertRule(pseudoElContent, style.sheet.cssRules.length);
    style.sheet.insertRule(anchorjsLinkFontFace, style.sheet.cssRules.length);
  };
}

var anchors = new AnchorJS();
