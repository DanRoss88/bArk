const express = require('express');
const router = express.Router();
const { getStories, addStories, editStory, addContributionToStory, deleteStories, seeStories, publishStory, getUserStoriesByUserId } = require('../db/queries/stories');
const { getContributions } = require('../db/queries/contributions');
const bodyParser = require('body-parser');

/// BROWSE ///
// router.get('/', async (req, res) => {
//   try {
//     const stories = await getStories();
//     res.render('index', stories);
//   } catch (err) {
//     console.log(err);
//     res.status(500).send("Unable to retrieve stories.");
//   }
// });

///BROWSE///
// ALL STORIES //
router.get('/', async (req, res) => {

  const userId = req.session.userid;
  console.log('##0 USER:', userId);

  try {
    const stories = await getStories(userId);
    const storiesWithContributions = await Promise.all(stories.map(async story => ({...story, contributions: await getContributions(story.id)})));
    console.log('#1 STORIES:', stories);
    const templateVars = { stories: storiesWithContributions, user: userId };
    res.status(200).render('index', templateVars);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// CREATE NEW USER STORY //

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

/// **** BROWSE *** ////
router.get('/my-stories', async (req, res) => {

  try {
    const stories = await getStories(req.session.userid);
    const templateVars = { stories: stories, user: req.session.userid };
    res.status(200).render('mystories', templateVars);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});


//EDIT STORY by story id//
router.get('/:id', async (req, res) => {

  try {
    const storyID = req.params.id;
    const story = await getUserStoriesByUserId(storyID);
    const templateVars = { story, user: req.session.userid };
    res.status(200).render('/stories/:id', templateVars);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});


router.put('/stories/:id', async (req, res) => {

  try {
   // const updatedStory =
    await editStory({ ...req.body, story_id : req.params.id });
    //res.status(200).json(updatedStory);
res.redirect('/stories');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }

});

// // ADD TO STORY //
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
// router.post('/stories/:id', async (req, res) => {
//   const story_id = req.params.id;

//   try {
//     const deletedStory = await deleteStories(story_id);
//     res.status(200).json(deletedStory);

//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Server error');
//   }
//   res.redirect('/');
// });

// // GET USERS STORIES //
// router.get('/users/:id/stories', async (req, res) => {
//   const user_id = req.params.id;

//   try {
//     const stories = await seeStories(user_id);
//     res.status(200).json(stories);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Server error');
//   }
// });


// // PUBLISH STORY //
// router.put('/stories/:id/publish', async (req, res) => {
//   const story_id = req.params.id;
//   const published_status = true;

//   try {
//     const publishedStory = await publishStory(story_id, published_status);
//     res.status(200).json(publishedStory);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Server error');
//   }
// });


module.exports = router;

