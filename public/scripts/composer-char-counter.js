$(document).ready(function () {
  //sets the maximum character length for input
  const tweetLength = 140;git a
  textArea = document.getElementById("tweet-text-input");
  $(textArea).on('keyup', function () {
    let remainCharCounter;
    remainCharCounter = $(this).siblings('.counter') - $(this).val().length;
    counter.text(remainCharCounter);
    if (remainCharCounter <= 0) {
      counter.addClass("red");
    }
  });
});