const express = require('express');
const router = express.Router();
const storiesQueries = require('../db/queries/stories');
const { getContributions } = require('../db/queries/contributions');


// / *** BROWSE *** /// HOME ////
router.get('/', async (req, res) => {

  try {
  const stories = await storiesQueries.getStories();
    const storiesWithContributions = await Promise.all(stories.map(async story => ({...story, contributions: await getContributions(story.id)})));
      const templateVars = { stories: storiesWithContributions };
      res.render('index', templateVars);

  } catch(e) {
      res.sendStatus(500);
    }
});

module.exports = router;
