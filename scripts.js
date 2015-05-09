$(document).ready(function() {
  $('.example-code-link').click(function(e) {
    e.preventDefault();
    $(this).parent().next().slideToggle();
  });
});
