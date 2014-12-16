/*!
* AnchorJS - v0.1.0 - 2014-08-17
* https://github.com/bryanbraun/anchorjs
* Copyright (c) 2014 Bryan Braun; Licensed MIT
*/
function addAnchors(selector, containername) {
  // Sensible default selector, if none is provided.
  selector = selector || 'h1, h2, h3, h4, h5, h6';

  // If containername option passed, then we find this element and only effect the child elements, apply to all elements in document.
  containerelement = document.querySelector(containername) || document

  // Select any elements that match the provided selector.
  var elements = containerelement.querySelectorAll(selector);

  // Loop through the selected elements.
  for (var i = 0; i < elements.length; i++) {
    var elementID;

    if (elements[i].hasAttribute('id')) {
      elementID = elements[i].getAttribute('id');
    } else {
      // We need to create an id on our element. First, we find which text selection method is available to the browser.
      var textMethod = document.body.textContent ? "textContent" : "innerText";

      // Get the text inside our element
      var roughText = elements[i][textMethod];

      // Refine it so it makes a good ID. Makes all lowercase and hyphen separated.
      // Ex. Hello World > hello-world
      tidyText = roughText.replace(/\s+/g, '-').toLowerCase();

      // Assign it to our element.
      // Currently the setAttribute element is only supported in IE9 and above.
      elements[i].setAttribute('id', tidyText);

      // Grab it for use in our anchor.
      elementID = tidyText;
    }
    var anchor = '<a class="anchor-link" href="#' + elementID + '"><span class="icon-link"></span></a>';

    elements[i].innerHTML = elements[i].innerHTML + anchor;
  }
}
