function slideExampleCode(event) {
  event.preventDefault();

  var slide = event.target.parentElement.nextElementSibling;
  slide.classList.toggle('open');

  if (slide.classList.contains('open')) {
    // open the example code
    slide.style.maxHeight = slide.scrollHeight + 'px';
  } else {
    // close the example code
    slide.style.maxHeight = 0;
  }
}

document.addEventListener('DOMContentLoaded', function() {
  // get the buttons
  var toggleButtons = document.querySelectorAll('.example-code-link');

  for (var i = 0; i < toggleButtons.length; i++) {
    // add the event to each button
    toggleButtons[i].addEventListener('click', slideExampleCode);
  }

  // Dynamically add PrismJS class for syntax highlight
  var jsCodes = document.querySelectorAll('pre[class*="js"] code');
  for (var j = 0; j < jsCodes.length; j++) {
    jsCodes[j].classList.add('language-javascript');
  }

  var cssCodes = document.querySelectorAll('pre.css code');
  for (var c = 0; c < cssCodes.length; c++) {
    cssCodes[c].classList.add('language-css');
  }
});
