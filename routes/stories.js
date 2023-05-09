const express = require('express');
const router = express.Router();
const { getStories, addStories, editStory, addContributionToStory, deleteStories, seeStories, publishStory } = require('../db/queries/stories');



/// BROWSE ///
router.get('/', async (req, res) => {
  try {
    const stories = await getStories();
    const templateVars = { stories };
    res.render('index', templateVars);
  } catch (err) {
    console.log(err);
    res.status(500).send("Unable to retrieve stories.");
  }
});


// ALL STORIES //
router.get('/stories', async (req, res) => {
  try {
    const stories = await getStories();
    res.status(200).json(stories);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// CREATE NEW STORY //
router.post('/stories', async (req, res) => {
  const { user_id, title, content } = req.body;
  const published_status = false;
  const date_created = new Date();

  try {
    const newStory = await addStories(user_id, title, content, published_status, date_created);
    res.status(201).json(newStory);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// EDIT STORY //
router.put('/stories/:id', async (req, res) => {
  const { title, content, published_status } = req.body;
  const story_id = req.params.id;

  try {
    const updatedStory = await editStory(story_id, title, content, published_status);
    res.status(200).json(updatedStory);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// ADD TO STORY //
router.post('/stories/:id/contributions', async (req, res) => {
  const { story_id, user_id, content } = req.body;
  const accepted_status = false;

  try {
    const newContribution = await addContributionToStory(story_id, user_id, content, accepted_status);
    res.status(201).json(newContribution);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// DELETE STORY //
router.delete('/stories/:id', async (req, res) => {
  const story_id = req.params.id;

  try {
    const deletedStory = await deleteStory(story_id);
    res.status(200).json(deletedStory);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// GET USERS STORIES //
router.get('/users/:id/stories', async (req, res) => {
  const user_id = req.params.id;

  try {
    const stories = await seeStories(user_id);
    res.status(200).json(stories);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});


// PUBLISH STORY //
router.put('/stories/:id/publish', async (req, res) => {
  const story_id = req.params.id;
  const published_status = true;

  try {
    const publishedStory = await publishStory(story_id, published_status);
    res.status(200).json(publishedStory);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});


module.exports = router;
