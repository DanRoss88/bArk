$(document).ready(function() {

$(".upvote-button").on('click', function() {
  let count = parseInt($(this).siblings(".numofupvotes").text());
  $(this).siblings(".numofupvotes").text(count + 1);
});

});

