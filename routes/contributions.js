const express = require('express');

const { addContributions, getContributions, deleteWhenAccepted, upvoteContribution, acceptContribution, addContributionToStory, checkAllContributionsAccepted } = require('../db/queries/contributions');
const router = express.Router();


/// *** BROWSE *** /// HOME ////

router.get('/', async (req, res) => {

  try {
    const contributions = await getContributions(); // pass
    console.log('CONTRIBUTIONS:', contributions);
    res.render('index', { contributions, stories:[] });
  } catch (err) {
    console.log(err);
    res.status(500).send("Unable to retrieve contributions");
    }

});

/// ** CREATE NEW CONTRIBUTION *** ///
router.post('/', async (req, res) => {

  const userId = req.session.userid;
  const storyId = req.body.story_id
  const content = req.body.content;

  const contributions = {
    user_id: userId,
    story_id: storyId,
    content
  };

  try {
    const newContribution = await addContributions(contributions)
    res.redirect('/stories');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error adding a contribution');
  }
});


/// ACCEPT CONTRIBUTION ///
router.post('/contributions/:id/accept', async (req, res) => {
  const contributionId = req.params.id;
  try {
    const contribution = await acceptContribution(contributionId);
    res.status(200).json(contribution);
  } catch (err) {
    console.error('Error accepting contribution:', err);
    res.status(500).send('Server error accepting contribution');
  }
});


//// ADD CONTRIBUTION TO STORY /////
router.post('/contributions', async (req, res) => {
  const userId = req.session.userid;
  const storyId = req.body.story_id;
  const content = req.body.content;

  try {
    const result = await addContributionToStory(userId, storyId, content);
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});


/// ** EDIT ** ///
router.post('/stories/contributions/:id', async (req, res) => {
  const { content } = req.body;
  const contribution_id = req.params.id;

  try {
    const updatedContribution = await editContribution(contribution_id, content);
    res.status(200).json(updatedContribution);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});


/// ** DELETE ** //
router.delete('/stories/contributions/:id', async (req, res) => {
  const contribution_id = req.params.id;

  try {
    const deletedContribution = await deleteContribution(contribution_id);
    res.status(200).json(deletedContribution);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

/// ** DELETE (WHEN ACCEPTED) *** ///
router.delete('/contributions/:id', async (req, res) => {
  const contribution_id = req.params.id;

  try {
    const mergedContribution = await deleteWhenAccepted(contribution_id);
    res.status(200).json(mergedContribution);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});


/// ** UPVOTE *** ///

router.post('/contributions/:id', async (req, res) => {
  const contribution_id = req.params.id;

  try {
    const upvotedContribution = await upvoteContribution(contribution_id);
    res.status(200).json(upvotedContribution);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
