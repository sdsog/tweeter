$(document).ready(function () {

  //sets the maximum character length for a tweet 
  const tweetLength = 140;

  $('#tweet-text-input').on('keyup', function () {

    //subtracts tweetlengtbh from total entered characters
    const remainCharCounter = tweetLength - $(this).val().length;

    //go to parent element (form) and find the respective counter
    //set the text to be equal the value calculated above
    $counter = $(this).siblings('.counter');
    $counter.text(remainCharCounter);

    // if remain text is less than 100, turns text counter red
    if (remainCharCounter <= 0) {
      $counter.addClass('red');
    } else {
      $counter.removeClass('red');
    }

  });

});