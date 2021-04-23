$(document).ready(function() {
  // Scroll to top button
  $(window).scroll(function() {
    const scrollBtn = $('#scroll-button');
    if ($(window).scrollTop() > 150) {
      scrollBtn.fadeIn();
    } else {
      scrollBtn.fadeOut();
    }
  });

  $('#scroll-button').on('click', function(event) {
    event.preventDefault();
    $(window).scrollTop(0);
  });
});