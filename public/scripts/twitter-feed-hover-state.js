$(document).ready(function () {
  $("#tweet-container").hover(function () {
    $(this).find(".tweet-feed").toggleClass("hover-main");
    $(this).find("h2").toggleClass("hover-h2");
    $(this).find(".icons").toggleClass("icons-hover");
    $(this).find("img").toggleClass("img-hover");
  });
});