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

  it("should place the # icon, when that option is set.", function() {
    var icon;
    anchors.options.icon = '¶';
    anchors.add('h1');
    icon = document.querySelector('.anchorjs-icon').getAttribute('data-anchorjs-icon');
    expect(icon).toEqual('¶');
  });

});
