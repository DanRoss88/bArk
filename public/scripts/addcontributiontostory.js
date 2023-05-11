const { addContributionToStory } = require('../db/queries/stories');
$(document).ready(function() {

$(".publish-button").on('click', function() {
     try {
     const storyID = req.params.id;
     const { content } = req.body;
     await addContributionToStory(storyID, content);
     res.redirect(`/stories/${storyID}`);
   } catch (err) {
     console.error(err);
     res.status(500).send('Server error');
   }
});

});
