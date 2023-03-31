//character counter back-end
$(document).ready(function() {
  $('#tweet-text').on('input', function(e) {

    const character = e.target.value.length; //the tweet that the user types
    //character limit of a valid tweet - the tweet that the user inputs
    const remainingCharacter = 140 - character;

    const counter = $('.counter');
    counter.text(remainingCharacter);

    //if tweet is over 140
    if (remainingCharacter < 0) {
      counter.addClass('red-text');
    } else {
      counter.removeClass('red-text');
    }
  });
});
