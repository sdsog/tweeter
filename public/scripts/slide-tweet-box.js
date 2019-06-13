$(() => {
  $('.new-tweet').hide();
  $('#compose-tweet').on('click', function () {
    $('.new-tweet').slideToggle(350, function () {
      $('textarea').focus();
      $("body").scrollTop(0);
    });
  });
});