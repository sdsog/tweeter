// Test / driver code (temporary). Eventually will get this from the server.
const data = [{
    "user": {
      "name": "Newton",
      "avatars": {
        "small": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
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
      "avatars": {
        "small": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
];

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

const loadTweets = () = {

  $('#fetch-posts').click(() => {
    $.getJSON(`/tweets`, (data) => {
        const $tweets = $('#tweets');
        $posts.empty();
        data.slice(5, 15).forEach(createPost);
    });
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

  renderTweets(data);
});