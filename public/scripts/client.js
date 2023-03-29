/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {

  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd"
      },
      "content": {
        "text": "I think; therefore I am"
      },
      "created_at": 1461113959088
    }
  ];

  const createTweetElement = function(tweet) {
    //construct a new element using JQuery with $ function
    const $tweet = $(`    
  <article class="tweet">
  <header>
    <div class="avatar">
    <img width="60px" src="${tweet.user.avatars}">
      <span> ${tweet.user.name}</span>
    </div>
    <p> ${tweet.user.handle}</p>
  </header>
  <p>${tweet.content.text}</p>
  <footer>
    <p>${tweet.created_at}</p>
    <div>
      <i class="fa-solid fa-flag icons"></i>
      <i class="fa-solid fa-retweet icons"></i>
      <i class="fa-solid fa-heart icons"></i>
    </div>
  </footer>
</article>`);

    return $tweet;

  };

  const renderTweets = function(tweets) {
    // loops through tweets
    for (const content of tweets) {
      // calls createTweetElement for each tweet
      let $tweet = createTweetElement(content);
      // takes return value and appends it to the tweets container
      $('#tweets-container').append($tweet);
    }
  };
  renderTweets(data);
});

