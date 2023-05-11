const { publishStory } = require('../db/queries/stories');
$(document).ready(function() {
$(".publish-button").on('click', function() {
const storyID = req.params.id;
  if (!storyID) {
    res.status().send('Story does not exist');
  }
  publishStory(storyID)
  $(this).siblings(".published").text("PUBLISHED");

});

