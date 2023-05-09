let count = 0;

$("#upvote").click(function() {
  count++;
  $("#numofupvotes").text(count);
});
