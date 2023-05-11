const express = require('express');
const router = express.Router();
const { getStories, addStories, editStory, deleteStory, getStoriesWithContributions, seeStory, publishStory, getStoryById } = require('../db/queries/stories');
const { getContributions } = require('../db/queries/contributions');



///BROWSE///
// ALL STORIES //
router.get('/', async (req, res) => {

  const userId = req.session.userid;


  try {
    const stories = await getStories(userId);

    const storiesWithContributions = await Promise.all(stories.map(async story => ({ ...story, contributions: await getContributions(story.id) })));

    const templateVars = { stories: storiesWithContributions, user: userId };

    res.status(200).render('index', templateVars);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

////// GET STORIES WITH CONTRIBUTIONS /////
router.get('/', async (req, res) => {
  const userId = req.session.userid;

  try {
    const storiesWithContributions = await getStoriesWithContributions(userId);
    const templateVars = { stories: storiesWithContributions, user: userId };
    res.status(200).render('index', templateVars);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});


////// CREATE NEW USER STORY ///////
router.post('/', async (req, res) => {
  console.log("here");

  try {
    await addStories({ ...req.body, user_id: req.session.userid });
    //res.status(200).json(newStory);
    res.redirect('/stories');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error for addStories');
  }
});

// GET USER STORY //
router.get('/:id', async (req, res) => {
  const user_id = req.params.id;

  try {
    const stories = await seeStory(user_id);
    res.status(200).json(stories);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

//EDIT STORY by story id//
router.get('/edit/:id', async (req, res) => {
  try {
    const storyID = req.params.id;
    const story = await getStoryById(storyID);
    const templateVars = { story, user: req.session.userid };
    res.status(200).render('edit', templateVars);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

router.post('/edit/:id', async (req, res) => {
  try {
    await editStory({ ...req.body, id: req.params.id });
    res.redirect('/stories');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// // DELETE STORY //
router.post('/:id/delete', async (req, res) => {
  const storyID = req.params.id;

  try {
    const story = await deleteStory(storyID);
    const templateVars = { story, user: req.session.userid };
    res.status(200).render('story', templateVars);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// PUBLISH STORY //
router.post('/:story_id/publish', async (req, res) => {
  const storyId = req.params.story_id;

  try {
    const publishedStory = await publishStory(storyId);
    res.status(200).json(publishedStory);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error publishing story');
  }
});



module.exports = router;

