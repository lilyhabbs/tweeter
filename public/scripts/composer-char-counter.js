// Count the number of characters in a new tweet
$(document).ready(function() {
  $('#tweet-text').keyup(function() {
    const maxLength = 140;
    let currentLength = $(this).val().length;
    const counter = $(this).closest('.new-tweet').find('.counter');

    counter.html(maxLength - currentLength);
    
    if (currentLength > maxLength) {
      counter.addClass('exceed-limit');
    } else {
      counter.removeClass('exceed-limit');
    }
  });
});