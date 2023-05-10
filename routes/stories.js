const express = require('express');
const router = express.Router();
const { getStories, addStories, editStory, addContributionToStory, deleteStories, seeStories, publishStory } = require('../db/queries/stories');
const bodyParser = require('body-parser');

/// BROWSE ///
router.get('/', async (req, res) => {
  try {
    const stories = await getStories();
    res.render('index', stories);
  } catch (err) {
    console.log(err);
    res.status(500).send("Unable to retrieve stories.");
  }
});


// ALL STORIES //
router.get('/stories', async (req, res) => {

  try {
    const stories = await getStories(req.session.userid);
    const templateVars = { stories : stories, user: req.session.userid };
    res.status(200).render('index', templateVars);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// CREATE NEW USER STORY //
router.post('/stories', async (req, res) => {
  try {
    const newStory = await addStories({ ...req.body, user_id: req.session.userid });
    res.status(200).json(newStory);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error for addStories');
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
  res.redirect('/');
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
  res.redirect('/');
});

// DELETE STORY //
router.delete('/stories/:id', async (req, res) => {
  const story_id = req.params.id;

  try {
    const deletedStory = await deleteStories(story_id);
    res.status(200).json(deletedStory);

  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
  res.redirect('/');
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

