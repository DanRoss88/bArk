const { addContributionToStory } = require('../db/queries/stories');
$(document).ready(function() {

$(".accept-contribution").on('click', function() {
     const storyID = req.params.id;
     const { content } = req.body;
     addContributionToStory(storyID, content);
});

});
