$(document).ready(function () {

  const loadTweets = () => {
    //loads tweets from database
    $.getJSON("/tweets")
      // add handler when getJSON is resolved to execute render
      .done(function (tweets) {
        renderTweets(tweets);
      });
  }

  const renderTweets = (tweets) => {
    $("#tweet-container").empty();
    for (let tweet of tweets) {
      $tweet = createTweetElement(tweet);
      $('#tweet-container').prepend($tweet);
    }
  }

  const createTweetElement = function (tweet) {

    var $article = $('<article>').addClass('tweet-feed');
    var $header = $('<header>').addClass('tweet-header').appendTo($article);
    $('<img>').attr('src', tweet.user.avatars.small).addClass('profile-pic').appendTo($header);
    $('<h2>').text(tweet.user.name).addClass('twitter-name').appendTo($header);
    $('<span>').text(tweet.user.handle).addClass('handle').appendTo($header);
    var $section = $('<p>').addClass('tweet-body').appendTo($article);
    $('<p>').text(tweet.content.text).appendTo($section);
    var $footer = $('<footer>').addClass('tweet-footer').appendTo($article);
    $('<span>').text(moment(tweet.created_at).startOf('minute').fromNow()).addClass('date').appendTo($footer);
    //$('<span>').text(timeAgo(tweet.created_at)).addClass('date').appendTo($footer);
    $('<i>').addClass('icon heart far fa-heart').appendTo($footer);
    $('<i>').addClass('icon retweet fas fa-retweet').appendTo($footer);
    $('<i>').addClass('icon flag far fa-flag').appendTo($footer);

    return $article;
  };


  $('#newTweet').on('submit', (event) => {
    event.preventDefault();

    //let lengthChecker = false;
    //finds text length of text area
    $textarea = $(this).find("textarea");
    $text = $textarea.val();
    $textLength = $text.length;
    $counter = $(this).find(".counter").first();
    $message = $(this).find("#message");

    $data = $textarea.serialize();

    if ($textLength > 140) {
      $message.text("Ain't nobody got time for that! Only 140 characters allowed!").toggle(true);
      $textarea.focus();
      console.log("text too long");
    } else if ($text === "" || $text === null) {
      $message.text("You can't just share nothing!").toggle(true);
      $textarea.focus();
      console.log("text empty");
    } else {

      $.post("/tweets/", $data)
        .done(function () {
          loadTweets();
        });

      $message.text("").toggle(false);
      $textarea.val("").focus();
      $counter.text("140");
    }
  });

  loadTweets();

});