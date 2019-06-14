//animates new tweet box to slide down, and auto focus with nav bar push  

$(() => {

  //new-tweet section default set to hidden
  $('.new-tweet').hide();

  //if #compose-tweet is clicked, button fades, icon dissapears and text is replaced
  $('#compose-tweet').on('click', function () {
    $('#compose-tweet .compose-tweet-btn').fadeTo("slow", 0.4);
    $('#compose-tweet p').text("You're Humming!");
    $('.fa-pen-nib').hide();

    //new-tweet section toggles on from hidden
    //text area is focused
    //body is scrolled to top 
    $('.new-tweet').toggle(400, function () {
      $('textarea').focus();
      $('body').scrollTop(0);
    });

  });

});