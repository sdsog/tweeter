$(document).ready(function () {
  //sets the maximum character length for a tweet 
  const tweetLength = 140;
  textArea = document.getElementById("tweet-text-input");
  $(textArea).on('keyup', function () {
    let counter;
    let remainCharCounter;
    counter = $(this).siblings('.counter');
    remainCharCounter = tweetLength - $(this).val().length;
    counter.text(remainCharCounter);
    if (remainCharCounter <= 0) {
      counter.addClass('red');
    } else {
      counter.removeClass('red');
    }
  });
});