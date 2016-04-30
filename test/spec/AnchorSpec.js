/* eslint-env jasmine */
/* global anchors, AnchorJS */

describe('AnchorJS', function() {
  'use strict';
  var el1;

  beforeEach(function() {
    var titleText = ' ⚡⚡ Don\'t forget: URL fragments should be i18n-friendly, hyphenated, short, and clean.';
    el1 = appendElementToBody('h1', titleText);
  });

  afterEach(function() {
    anchors.removeAll();
    document.body.removeChild(el1);
  });

  it('can detect if an element has an AnchorJS link', function() {
    var el2 = appendElementToBody('h2', 'Example Title'),
        el3 = appendElementToBody('h3');

    anchors.add('h1');
    expect(anchors.hasAnchorJSLink(el1)).toBe(true);
    expect(anchors.hasAnchorJSLink(el2)).toBe(false);
    expect(anchors.hasAnchorJSLink(el3)).toBe(false);

    document.body.removeChild(el2);
    document.body.removeChild(el3);
  });

  it('should add an anchor link to an h1 by default', function() {
    var anchorLink;
    anchors.add();
    anchorLink = document.querySelector('h1 > .anchorjs-link');
    expect(anchorLink).not.toBe(null);
  });

  it('add/remove accepts a string (selector), nodelist, or array of els', function() {
    var el2 = appendElementToBody('h2', 'Example Title');

    anchors.add('h2');
    expect(anchors.hasAnchorJSLink(el2)).toBe(true);
    anchors.remove('h2');
    expect(anchors.hasAnchorJSLink(el2)).toBe(false);

    anchors.add(document.querySelectorAll('h2'));
    expect(anchors.hasAnchorJSLink(el2)).toBe(true);
    anchors.remove(document.querySelectorAll('h2'));
    expect(anchors.hasAnchorJSLink(el2)).toBe(false);

    anchors.add([document.querySelector('h2')]);
    expect(anchors.hasAnchorJSLink(el2)).toBe(true);
    anchors.remove([document.querySelector('h2')]);
    expect(anchors.hasAnchorJSLink(el2)).toBe(false);

    document.body.removeChild(el2);
  });

  it('should set the expected default options', function() {
    anchors.add();

    expect(anchors.options.icon).toEqual('\ue9cb');
    expect(anchors.options.visible).toEqual('hover');
    expect(anchors.options.placement).toEqual('right');
    expect(anchors.options.class).toEqual('');
    expect(anchors.options.truncate).toEqual(64);
  });

  it('does not destroy default options when setting an incomplete options object', function() {
    var anchorObj;

    anchors.options = { class: 'test-class' };
    anchors.add();
    anchorObj = new AnchorJS({ class: 'test-class' });

    expect(anchors.options.icon).toEqual('\ue9cb');
    expect(anchorObj.options.icon).toEqual('\ue9cb');
    expect(anchors.options.visible).toEqual('hover');
    expect(anchorObj.options.visible).toEqual('hover');
    expect(anchors.options.placement).toEqual('right');
    expect(anchorObj.options.placement).toEqual('right');
  });

  it('should set baseline styles in the document head', function() {
    var hasClass;
    anchors.add();
    // We query for the first style tag because we are testing both that it's
    // there and that it's overridable by other styles later in the cascade.
    hasClass = document.head.querySelector('[rel="stylesheet"], style').classList.contains('anchorjs');
    expect(hasClass).toBe(true);
  });

  it('allows you to instantiate a new AnchorJS object that behaves like the default one', function() {
    var anchorObj,
        anchorLink;
    anchorObj = new AnchorJS();
    anchorObj.add();
    anchorLink = document.querySelector('h1 > .anchorjs-link');
    expect(anchorLink).not.toBe(null);
  });

  it('ensures new AnchorJS instances do not add multiple baseline style tags.', function() {
    var anchorObj,
        styleNodes;
    anchors.add();
    anchorObj = new AnchorJS();
    anchorObj.add();
    styleNodes = document.head.querySelectorAll('.anchorjs');
    expect(styleNodes.length).toEqual(1);
  });

  it('can remove anchors, using the .remove() method.', function() {
    var anchorLinkBefore,
        anchorLinkAfter;
    anchors.add();
    anchorLinkBefore = document.querySelector('h1 > .anchorjs-link');
    expect(anchorLinkBefore).not.toBe(null);

    anchors.remove('h1');
    anchorLinkAfter = document.querySelector('h1 > .anchorjs-link');
    expect(anchorLinkAfter).toBe(null);
  });

  it('can remove all anchors with removeAll', function() {
    var el2 = appendElementToBody('h2', 'Example Title');

    anchors.add('h1, h2');
    expect(anchors.hasAnchorJSLink(el1)).toBe(true);
    expect(anchors.hasAnchorJSLink(el2)).toBe(true);

    anchors.removeAll();
    expect(anchors.hasAnchorJSLink(el1)).toBe(false);
    expect(anchors.hasAnchorJSLink(el2)).toBe(false);
    expect(anchors.elements.length).toBe(0);

    document.body.removeChild(el2);
  });

  it('can chain methods.', function() {
    var anchorLinkBefore,
        anchorLinkAfter;
    anchors.add('h1').remove('h1');
    anchorLinkBefore = document.querySelector('h1 > .anchorjs-link');
    expect(anchorLinkBefore).toBe(null);

    anchors.remove('h1').add('h1');
    anchorLinkAfter = document.querySelector('h1 > .anchorjs-link');
    expect(anchorLinkAfter).not.toBe(null);
  });

  it('should create a URL-appropriate ID (and href) for targeted elements without IDs.', function() {
    var href,
        id;
    anchors.add('h1');
    href = document.querySelector('.anchorjs-link').getAttribute('href');
    id = document.getElementsByTagName('h1')[0].getAttribute('id');
    expect(href).toEqual('#⚡⚡-dont-forget-url-fragments-should-be-i18n-friendly-hyphenated');
    expect(id).toEqual('⚡⚡-dont-forget-url-fragments-should-be-i18n-friendly-hyphenated');
  });

  it('should leave existing IDs in place, and use them as the href for anchors.', function() {
    var href,
        id;
    document.getElementsByTagName('h1')[0].setAttribute('id', 'test-id');
    anchors.add('h1');
    href = document.querySelector('.anchorjs-link').getAttribute('href');
    id = document.getElementsByTagName('h1')[0].getAttribute('id');
    expect(href).toEqual('#test-id');
    expect(id).toEqual('test-id');
  });

  it('should increment new IDs if multiple IDs are found on a page.', function() {
    var el2 = appendElementToBody('h2', 'Example Title'),
        el3 = appendElementToBody('h2', 'Example Title'),
        el4 = appendElementToBody('h2', 'Example Title'),
        id1,
        id2,
        id3,
        href1,
        href2,
        href3,
        tags,
        links;

    anchors.add('h2');
    tags = document.getElementsByTagName('h2');
    links = document.querySelectorAll('h2 > .anchorjs-link');
    id1 = tags[0].getAttribute('id');
    href1 = links[0].getAttribute('href');
    id2 = tags[1].getAttribute('id');
    href2 = links[1].getAttribute('href');
    id3 = tags[2].getAttribute('id');
    href3 = links[2].getAttribute('href');

    expect(id1).toEqual('example-title');
    expect(href1).toEqual('#example-title');
    expect(id2).toEqual('example-title-1');
    expect(href2).toEqual('#example-title-1');
    expect(id3).toEqual('example-title-2');
    expect(href3).toEqual('#example-title-2');

    document.body.removeChild(el2);
    document.body.removeChild(el3);
    document.body.removeChild(el4);
  });

  it('should throw an error if an inappropriate selector is provided.', function() {
    expect(function() {
      anchors.add(25);
    }).toThrowError('The selector provided to AnchorJS was invalid.');
  });

  it('silently prevents an anchor from being added twice to the same element', function() {
    var anchorLinkList1,
        anchorLinkList2;
    anchors.add('h1');

    anchorLinkList1 = document.querySelectorAll('h1 > .anchorjs-link');
    expect(anchorLinkList1.length).toEqual(1);
    anchors.add('h1');
    anchorLinkList2 = document.querySelectorAll('h1 > .anchorjs-link');
    expect(anchorLinkList2.length).toEqual(1);
  });

  describe('exposed elements list', function() {
    var el2,
        el3,
        el4;

    beforeEach(function() {
      el2 = appendElementToBody('h2', 'Example Title 1');
      el3 = appendElementToBody('h2', 'Example Title 2');
      el4 = appendElementToBody('h3', 'Example Title 3');
    });

    afterEach(function() {
      document.body.removeChild(el2);
      document.body.removeChild(el3);
      document.body.removeChild(el4);
    });

    it('contains added anchors', function() {
      anchors.add('h2');
      expect(anchors.elements.length).toEqual(2);
      expect(anchors.elements[0].textContent).toEqual('Example Title 1');
      expect(anchors.elements[1].textContent).toEqual('Example Title 2');
    });

    it('contains combined anchors from multiple adds', function() {
      anchors.add('h2');
      expect(anchors.elements.length).toEqual(2);
      anchors.add('h3');
      expect(anchors.elements.length).toEqual(3);
    });

    it('doesn\'t contain removed anchors', function() {
      anchors.add('h2, h3');
      expect(anchors.elements.length).toEqual(3);
      expect(anchors.elements.indexOf(el4)).toEqual(2);
      anchors.remove('h3');
      expect(anchors.elements.length).toEqual(2);
      expect(anchors.elements.indexOf(el4)).toEqual(-1);
    });
  });

  describe('urlify', function() {
    it('preserves unicode characters', function() {
      var text1Before = 'Заголовок, содержащий 29 не-ASCII символов',
          text1After = 'заголовок-содержащий-29-не-ascii-символов',
          text2Before = '船や航海を連想させるものとして、シンボル的に用いられることも多い。',
          text2After = '船や航海を連想させるものとして、シンボル的に用いられることも多い。',
          text3Before = 'അടിത്തട്ടിലെ മണ്ണിൽ ആഴ്ന്നിറങ്ങുക, ഭാരത്താൽ താഴ്ന്നു കിടക്കുക, കപ്പലിന്റെ ഗുരുത്വകേന്ദ്രവും',
          text3After = 'അടിത്തട്ടിലെ-മണ്ണിൽ-ആഴ്ന്നിറങ്ങുക-ഭാരത്താൽ-താഴ്ന്നു-കിടക്കുക-കപ്',
          text4Before = 'Use ⚓ and 👪 all over the 🌐 can 🔗 inside your webpages.',
          text4After = 'use-⚓-and-👪-all-over-the-🌐-can-🔗-inside-your-webpages';

      expect(anchors.urlify(text1Before)).toEqual(text1After);
      expect(anchors.urlify(text2Before)).toEqual(text2After);
      expect(anchors.urlify(text3Before)).toEqual(text3After);
      expect(anchors.urlify(text4Before)).toEqual(text4After);
    });

    it('removes non-url-safe characters', function() {
      var text1Before = 'one&two three+four$five,six:seven;eight=nine?ten',
          text2Before = 'one@two"three#four{five}six|seven^eight~nine[ten',
          text3Before = 'one`two%three!four]five.six/seven(eight)nine*ten\\',
          after = 'one-two-three-four-five-six-seven-eight-nine-ten';

      expect(anchors.urlify(text1Before)).toEqual(after);
      expect(anchors.urlify(text2Before)).toEqual(after);
      expect(anchors.urlify(text3Before)).toEqual(after);
    });

    it('trims whitespace characters', function() {
      var text1Before = '\n abc\r',
          text2Before = 'abc  ',
          text3Before = 'abc\n ',
          after = 'abc';

      expect(anchors.urlify(text1Before)).toEqual(after);
      expect(anchors.urlify(text2Before)).toEqual(after);
      expect(anchors.urlify(text3Before)).toEqual(after);
    });

    it('removes apostrophes', function() {
      var before = 'don\'t',
          after = 'dont';

      expect(anchors.urlify(before)).toEqual(after);
    });

    it('truncates IDs using truncate option', function() {
      var before = 'Today you are you! That is truer than true! There is no one alive who is you-er than you!',
          trunc1 = 'today-you-are-you-that-is-truer-than-true-there-is-no-one-alive',
          trunc2 = 'today-you-are-you-that-is-truer-than-true',
          trunc3 = 'today-you-are-you',
          trunc4 = 'today-you-are-you-that-is-truer-than-true-there-is-no-one-alive-who-is-you-er-than-you';

      expect(anchors.urlify(before)).toEqual(trunc1);
      anchors.options.truncate = 41;
      expect(anchors.urlify(before)).toEqual(trunc2);
      anchors.options.truncate = 17;
      expect(anchors.urlify(before)).toEqual(trunc3);
      anchors.options.truncate = 87;
      expect(anchors.urlify(before)).toEqual(trunc4);

      // Verify that the final answer remains the same for non-integer numbers or strings.
      anchors.options.truncate = 87.9999999999;
      expect(anchors.urlify(before)).toEqual(trunc4);
      anchors.options.truncate = '87';
      expect(anchors.urlify(before)).toEqual(trunc4);
    });
  });

  describe('icon option', function() {
    var icon;

    it('allows custom icons to be set, (using octal codes)', function() {
      anchors.add('h1');
      icon = document.querySelector('h1 .anchorjs-link').getAttribute('data-anchorjs-icon');
      expect(icon).toEqual('\ue9cb');
    });

    it('allows unicode icons to be set', function() {
      anchors.options.icon = '¶';
      anchors.add('h1');
      icon = document.querySelector('h1 .anchorjs-link').getAttribute('data-anchorjs-icon');
      expect(icon).toEqual('¶');
    });
  });

  describe('class option', function() {
    it('should add the given class to the anchorjs element', function() {
      var anchorLink;
      anchors.options.class = 'test-class';
      anchors.add('h1');
      anchorLink = document.querySelector('h1 > .anchorjs-link.test-class');
      expect(anchorLink).not.toBe(null);
    });
  });

  describe('placement option', function() {
    var anchorNode;

    it('`left`, places the anchor to the left of the text.', function() {
      anchors.options.placement = 'left';
      anchors.add('h1');
      anchorNode = document.getElementsByTagName('h1')[0].firstChild;
      expect(anchorNode.style.position).toEqual('absolute');
      expect(anchorNode.style.marginLeft).toEqual('-1em');
    });

    it('`right`, places the anchor to the right of the text.', function() {
      anchors.options.placement = 'right';
      anchors.add('h1');
      anchorNode = document.getElementsByTagName('h1')[0].lastChild;
      expect(anchorNode.style.position).toEqual('');
      expect(anchorNode.style.marginLeft).toEqual('');
    });
  });

  describe('visibility option', function() {
    var opacity;

    it('`hover` hides anchor links', function() {
      anchors.options.visible = 'hover';
      anchors.add('h1');
      opacity = document.querySelector('.anchorjs-link').style.opacity;
      expect(opacity).not.toEqual('1');
    });

    it('`always` shows anchor links', function() {
      anchors.options.visible = 'always';
      anchors.add('h1');
      opacity = document.querySelector('.anchorjs-link').style.opacity;
      expect(opacity).toEqual('1');
    });

    it('`touch` invokes the `always` behavior for touch devices', function() {
      spyOn(anchors, 'isTouchDevice').and.returnValue(true);
      anchors.options.visible = 'touch';
      anchors.add('h1');
      opacity = document.querySelector('.anchorjs-link').style.opacity;
      expect(opacity).toEqual('1');
    });

    it('`touch` invokes the `hover` behavior for non-touch devices', function() {
      spyOn(anchors, 'isTouchDevice').and.returnValue(false);
      anchors.options.visible = 'touch';
      anchors.add('h1');
      opacity = document.querySelector('.anchorjs-link').style.opacity;
      expect(opacity).not.toEqual('1');
    });
  });
});

/**
 * A function for the common task of appending an
 * element to the document body for applying anchors to.
 * @param {String} tagName  - The string for the tag name you want to create.
 * @param {String} text     - The text for the textnode inside the tag (optional).
 * @return {HTMLElement}    - The element you've appended.
 */
function appendElementToBody(tagName, text) {
  'use strict';
  var el = document.createElement(tagName),
      textNode;

  if (text) {
    textNode = document.createTextNode(text);
    el.appendChild(textNode);
  }
  document.body.appendChild(el);
  return el;
}
