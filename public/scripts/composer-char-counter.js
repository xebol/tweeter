//character counter back-end
$(document).ready(function() {
  $('#tweet-text').on('input', function(e) {
    const character = e.target.value.length;
    const remainingCharacter = 140 - character;
    const counter = $('.counter');
    counter.text(remainingCharacter);
    if (remainingCharacter < 0) {
      counter.addClass('red-text');
    } else {
      counter.removeClass('red-text')
    }
  });
});
