describe("AnchorJS", function() {
  var h,
      t;

  beforeEach(function() {
    h = document.createElement("h1");
    t = document.createTextNode("⚡⚡⚡ Unicode icons are cool--but don't belong in a URL.");
    h.appendChild(t);
    document.body.appendChild(h);
  });

  afterEach(function() {
    document.body.removeChild(h);
  });


  it("should add an anchor link to an h1 by default", function() {
    var anchorLink;
    anchors.add();
    anchorLink = document.querySelector('h1 > .anchorjs-link');
    expect(anchorLink).not.toBe(null);
  });

  it("should have default options (right placement, hover visiblity, & link icon)", function() {
    var anchorLink,
        hasClass,
        opacity,
        icon;
    anchors.add();
    anchorLink = document.getElementsByTagName('h1')[0].lastChild;
    hasClass = anchorLink.classList.contains('anchorjs-link');
    opacity = anchorLink.style.opacity;
    icon = document.querySelector('.anchorjs-link').getAttribute('data-anchorjs-icon');

    expect(hasClass).toBe(true);
    expect(opacity).not.toEqual('1');
    expect(icon).toEqual('');
  });

  it("should set baseline styles in the document head", function() {
    var hasClass;
    anchors.add();
    // We query for the first style tag because we are testing both that it's
    // there and that it's overridable by other styles later in the cascade.
    hasClass = document.head.getElementsByTagName('style')[0].classList.contains('anchorjs');
    expect(hasClass).toBe(true);
  });

  it("allows you to instantiate a new AnchorJS object that behaves like the default one.", function() {
    var anchorObj,
        anchorLink;
    anchorObj = new AnchorJS();
    anchorObj.add();
    anchorLink = document.querySelector('h1 > .anchorjs-link');
    expect(anchorLink).not.toBe(null);
  });

  it("ensures new AnchorJS instances don't add multiple baseline style tags.", function() {
    var anchorObj,
        anchorLink;
    anchors.add();
    anchorObj = new AnchorJS();
    anchorObj.add();
    styleNodes = document.head.querySelectorAll('.anchorjs');
    expect(styleNodes.length).toEqual(1);
  });

  it("doesn't destroy default options when setting an incomplete options object.", function() {
    var anchorObj,
        anchorLink,
        hasClass,
        opacity,
        icon;
    anchors.options = { class: 'test-class' };
    anchors.add();
    anchorObj = new AnchorJS({ class: 'test-class' });

    expect(anchors.options.icon).toEqual('&#xe9cb');
    expect(anchorObj.options.icon).toEqual('&#xe9cb');
    expect(anchors.options.visible).toEqual('hover');
    expect(anchorObj.options.visible).toEqual('hover');
    expect(anchors.options.placement).toEqual('right');
    expect(anchorObj.options.placement).toEqual('right');
  });

  it("can remove anchors, using the .remove() method.", function() {
    var anchorLinkBefore,
        anchorLinkAfter;
    anchors.add();
    anchorLinkBefore = document.querySelector('h1 > .anchorjs-link');
    expect(anchorLinkBefore).not.toBe(null);

    anchors.remove('h1');
    anchorLinkAfter = document.querySelector('h1 > .anchorjs-link');
    expect(anchorLinkAfter).toBe(null);
  });

  it("can chain methods.", function() {
    var anchorLinkBefore,
        anchorLinkAfter;
    anchors.add('h1').remove('h1');
    anchorLinkBefore = document.querySelector('h1 > .anchorjs-link');
    expect(anchorLinkBefore).toBe(null);

    anchors.remove('h1').add('h1');
    anchorLinkAfter = document.querySelector('h1 > .anchorjs-link');
    expect(anchorLinkAfter).not.toBe(null);
  });

  it("should create a URL-appropriate ID (and href) for targeted elements without IDs.", function() {
    var href,
        id;
    anchors.add('h1');
    href = document.querySelector('.anchorjs-link').getAttribute('href');
    id = document.getElementsByTagName('h1')[0].getAttribute('id');
    expect(href).toEqual('#unicode-icons-are-cool-but-dont');
    expect(id).toEqual('unicode-icons-are-cool-but-dont');
  });

  it("should leave existing IDs in place, and use them as the href for anchors.", function() {
    var href,
        id;
    document.getElementsByTagName('h1')[0].setAttribute('id', 'test-id')
    anchors.add('h1');
    href = document.querySelector('.anchorjs-link').getAttribute('href');
    id = document.getElementsByTagName('h1')[0].getAttribute('id');
    expect(href).toEqual('#test-id');
    expect(id).toEqual('test-id');
  });

  it("should increment new IDs if multiple IDs are found on a page.", function() {
    var h1,
        t1,
        id1,
        href1,
        h2,
        t2,
        id2,
        href2,
        h3,
        t3,
        id3,
        href3,
        tags,
        links,
        i;
    h1 = document.createElement("h2");
    t1 = document.createTextNode("Example Title");
    h1.appendChild(t1);
    h2 = document.createElement("h2");
    t2 = document.createTextNode("Example Title");
    h2.appendChild(t2);
    h3 = document.createElement("h2");
    t3 = document.createTextNode("Example Title");
    h3.appendChild(t3);
    document.body.appendChild(h1);
    document.body.appendChild(h2);
    document.body.appendChild(h3);
    anchors.add('h2');
    tags = document.getElementsByTagName('h2');
    links = document.querySelectorAll('.anchorjs-link');
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

    document.body.removeChild(h1);
    document.body.removeChild(h2);
    document.body.removeChild(h3);
  });

  it("should throw an error if an inappropriate selector is provided.", function() {
    expect(function() {
      anchors.add(25);
    }).toThrowError("The selector provided to AnchorJS was invalid.");
  });

  it("should place the ¶ icon, when that option is set.", function() {
    var icon;
    anchors.options.icon = '¶';
    anchors.add('h1');
    icon = document.querySelector('.anchorjs-link').getAttribute('data-anchorjs-icon');
    expect(icon).toEqual('¶');
  });

  it("should place anchors to the left, when that option is set.", function() {
    var anchorNode;
    anchors.options.placement = 'left';
    anchors.add('h1');
    anchorNode = document.getElementsByTagName('h1')[0].firstChild;
    expect(anchorNode.style.position).toEqual('absolute');
    expect(anchorNode.style.marginLeft).toEqual('-1.25em');
  });

  it("should make anchors always visible, when that option is set.", function() {
    var opacity;
    anchors.options.visible = 'always';
    anchors.add('h1');
    opacity = document.querySelector('.anchorjs-link').style.opacity;
    expect(opacity).toEqual('1');
  });

  it("should apply a provided class, when that option is set.", function() {
    var anchorLink;
    anchors.options.class = 'test-class';
    anchors.add('h1');
    anchorLink = document.querySelector('h1 > .test-class');
    expect(anchorLink).not.toBe(null);
  });
});
