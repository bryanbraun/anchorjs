function slideExampleCode(e) {
  e.preventDefault();

  var slide = e.target.parentElement.nextElementSibling;
  slide.classList.toggle('open');

  if(slide.classList.contains('open')) {
    slide.style.maxHeight = slide.scrollHeight + 'px'; // open the example code
  } else {
    slide.style.maxHeight = 0; // close the example code
  }
}

document.addEventListener('DOMContentLoaded', function() {
  var toggleButtons = document.getElementsByClassName('example-code-link'); // get the buttons

  for(var i = 0; i < toggleButtons.length; i++) {
    toggleButtons[i].addEventListener("click", slideExampleCode); // add the event to each button
  }

  // Dynamically add PrismJS class for syntax highlight
  var jsCodes = document.querySelectorAll('pre[class*="js"] code');
  for(var i = 0; i < jsCodes.length; i++) {
    jsCodes[i].classList.add('language-javascript');
  }

  var cssCodes = document.querySelectorAll('pre.css code');
  for(var i = 0; i < cssCodes.length; i++) {
    cssCodes[i].classList.add('language-css');
  }
});
