const express = require('express');
const router = express.Router();
const { getStories, addStories, editStory, addContributionToStory, deleteStory, seeStory, publishStory, getUserStoriesById, getStoryById } = require('../db/queries/stories');
const { getContributions } = require('../db/queries/contributions');


const bodyParser = require('body-parser');


///BROWSE///
// ALL STORIES //
router.get('/', async (req, res) => {

  const userId = req.session.userid;


  try {
    const stories = await getStories(userId);

    const storiesWithContributions = await Promise.all(stories.map(async story => ({...story, contributions: await getContributions(story.id)})));

    const templateVars = { stories: storiesWithContributions, user: userId };

    res.status(200).render('index', templateVars);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

//CREATE NEW USER STORY //

// router.post('/', async (req, res) => {
//   const { title, content } = req.body;

//   if (!title || !content) {
//     res.status().send('error no story/no title');
//   }
//   try {
//     const story = { title, content, user_id: req.session.userid };

//     await addStories(story);
//     res.redirect('/stories');
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Server error for addStories');
//   }
// });

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


//EDIT STORY by story id//
// router.get('/edit/:id', async (req, res) => {

//   try {
//     const storyID = req.params.id;
//     const story = await getUserStoriesByUserId(storyID);
//     const templateVars = { story, user: req.session.userid };
//     res.status(200).render('edit', templateVars);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Server error');
//   }
// });
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

// router.put('/edit/:id', async (req, res) => {

//   try {

//     await editStory({ ...req.body, user_id: req.session.userid });
//     res.redirect('/stories');
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Server error');
//   }

// });
router.post('/edit/:id', async (req, res) => {
  try {
    await editStory({ ...req.body, id: req.params.id });
    res.redirect('/stories');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});
// ADD TO STORY //
// router.post('/:id/contributions', async (req, res) => {
//   const { story_id, user_id, content } = req.body;
//   const accepted_status = false;

//   try {
//     const newContribution = await addContributionToStory(story_id, user_id, content, accepted_status);
//     res.status(201).json(newContribution);

//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Server error');
//   }
//   res.redirect('/');
// });

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


// POST - Add a contribution to a user story
 router.post('/', async (req, res) => {
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

// PUBLISH STORY //
router.post('/stories/:id/publish', async (req, res) => {
  const storyID = req.params.id;
  if (!storyID) {
    res.status().send('error no story');
  }
  try {
    await publishStory(storyID);
    res.redirect('/stories');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});


module.exports = router;

