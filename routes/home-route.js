const express = require('express');
const router = express.Router();
const storiesQueries = require('../db/queries/stories');
const { getContributions } = require('../db/queries/contributions');


// / *** BROWSE *** /// HOME ////
router.get('/', async (req, res) => {

  try {
  const stories = await storiesQueries.getStories();
  // console.log('STORY:', stories);
    const storiesWithContributions = await Promise.all(stories.map(async story => ({...story, contributions: await getContributions(story.id)})));
    // console.log('WITHCONT:', storiesWithContributions);
      const templateVars = { stories: storiesWithContributions };
      res.render('index', templateVars);

  } catch(e) {
      res.sendStatus(500);
    }
});

module.exports = router;
