/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  //prevents cross site scripting
  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

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
  <p>${escape(tweet.content.text)}</p>
  <footer>
    <p>${timeago.format(tweet.created_at)}</p>
    <div>
      <i class="fa-solid fa-flag icons"></i>
      <i class="fa-solid fa-retweet icons"></i>
      <i class="fa-solid fa-heart icons"></i>
    </div>
  </footer>
</article>`);

    return $tweet;

  };

  //access the tweets-container in the DOM to be able to access the tweets
  const $tweetsContainer = $('#tweets-container');

  const loadTweets = function() {
    $.ajax({
      method: 'GET',
      url: '/tweets'
    }).then((tweets) => { //if no success property it will return a promise
      console.log(tweets); //console log the response

      //resets the tweets container to it's original state without duplicating the original tweets
      $tweetsContainer.empty();

      renderTweets(tweets);
    });


    const renderTweets = function(tweets) {
      // loops through tweets
      for (const content of tweets) {
        // calls createTweetElement for each tweet
        let $tweet = createTweetElement(content);
        // takes return value and appends it to the tweets container
        $('#tweets-container').prepend($tweet);
      }
    };
  };

  //load the tweets on the initial refresh
  loadTweets();

  //grab the form and store it as a variable using JQuery implementation
  const $form = $('#new-tweet-form');

  //add submit handler to the form to submit new tweets
  $form.on('submit', (event) => {
    //prevents the default behaviour 'refresh' of the browser
    event.preventDefault();
    const tweetinput = $('#tweet-text');
    if (tweetinput.val().length > 140) {
      $('.error').slideDown(500);
      return;
    } else {
      $('.error').slideUp(500);
    }

    //serialize the data
    const urlEncoded = $form.serialize();

    $.ajax({
      method: 'POST',
      url: '/tweets',
      data: urlEncoded
    }).then((newTweet) => {
      console.log(newTweet);
      $('#tweet-text').val('');
      $('#character').val(140);
      loadTweets();
    });
  });
});

