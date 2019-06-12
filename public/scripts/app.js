const timeAgo = (ts) => {
  const d = new Date();
  const nowTs = Math.floor(d.getTime() / 1000);
  const seconds = nowTs - ts;

  if (seconds > 2 * 24 * 3600) {
    return "a few days ago";
  }
  if (seconds > 24 * 3600) {
    return "yesterday";
  }
  if (seconds > 3600) {
    return "a few hours ago";
  }
  if (seconds > 1800) {
    return "Half an hour ago";
  }
  if (seconds > 60) {
    return Math.floor(seconds / 60) + " minutes ago";
  }
  return "A long time ago"
}

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
    $('<span>').text(timeAgo(tweet.created_at)).addClass('date').appendTo($footer);
    $('<i>').addClass('icon heart far fa-heart').appendTo($footer);
    $('<i>').addClass('icon retweet fas fa-retweet').appendTo($footer);
    $('<i>').addClass('icon flag far fa-flag').appendTo($footer);

    return $article;
  };


  $('#newTweet').on('submit', (event) => {
    event.preventDefault();
    $.post(`/tweets`, $('#newTweet').serialize(), (newTweet) => {
      createTweetElement(newTweet);
      console.log(newTweet);
    });
  });

  loadTweets();

});