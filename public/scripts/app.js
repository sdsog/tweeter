$(document).ready(function () {

  const loadTweets = () => {
    //loads tweets from database
    $.getJSON("/tweets")
      // add handler when getJSON is resolved to execute render
      .done(function (tweets) {
        renderTweets(tweets);
      });
  }

  //Takes in array of tweet objects, call the createTweetElement function,
  //to return jQuery object, then append each to the #tweets-container section
  const renderTweets = (tweets) => {
    $("#tweet-container").empty();
    for (let tweet of tweets) {
      $tweet = createTweetElement(tweet);
      $('#tweet-container').prepend($tweet);
    }
  }

  //structure of each tweet included in html
  const createTweetElement = function (tweet) {

    var $article = $('<article>').addClass('tweet-feed');
    var $header = $('<header>').addClass('tweet-header').appendTo($article);
    $('<img>').attr('src', tweet.user.avatars.small).addClass('profile-pic').appendTo($header);
    $('<h2>').text(tweet.user.name).addClass('twitter-name').appendTo($header);
    $('<span>').text(tweet.user.handle).addClass('handle').appendTo($header);
    var $section = $('<p>').addClass('tweet-body').appendTo($article);
    $('<p>').text(tweet.content.text).appendTo($section);
    var $footer = $('<footer>').addClass('tweet-footer').appendTo($article);
    //moment library to create date
    $('<span>').text(moment(tweet.created_at).startOf('minute').fromNow()).addClass('date').appendTo($footer);
    $('<i>').addClass('icon heart far fa-heart').appendTo($footer);
    $('<i>').addClass('icon retweet fas fa-retweet').appendTo($footer);
    $('<i>').addClass('icon flag far fa-flag').appendTo($footer);

    //return structure that gets appended in the html
    return $article;
  };

 //event listener to submit button for new tweet 
  $('#newTweet').on('submit', (event) => {
    event.preventDefault();

    //get data from the form
    $textarea = $(this).find("textarea");
    $counter = $(this).find(".counter").first();
    $message = $(this).find("#message");

    //length validation checker
    $text = $textarea.val();
    $textLength = $text.length;

    //prepare data for Ajax calling
    $data = $textarea.serialize();

  
    if ($textLength > 140) {

      //message for over 140 characters
      $message.text("Ain't nobody got time for that! Only 140 characters allowed!").toggle(true);
      $textarea.focus();

    } else if ($text === "" || $text === null) {
      //message for empty text
      $message.text("You can't just share nothing!").toggle(true);
      $textarea.focus();
    } else {

      //message passed validation and is posted in tweet feed
      $.post("/tweets/", $data)
        .done(function () {
          loadTweets();
        });

      //clears form and resets value after successful validation 
      $message.text("").toggle(false);
      $textarea.val("").focus();
      $counter.text("140");
    }
  });

  loadTweets();

});