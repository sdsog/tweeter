$(() => {





  $('#submitTweet').on('submit', function () {
    event.preventDefault();
    $.post(`/tweets`, $('#newTweet').serialize(), (newTweet) => {
      console.log()
      renderTweets(newTweet);
    });

  });




  //     method: 'POST'
  //   })
  //   .then(function (morePostsHtml) {
  //     console.log('Success: ', morePostsHtml);
  //     $button.replaceWith(morePostsHtml);






});