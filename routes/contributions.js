const express = require('express');
const { addContributions, getContributions, deleteWhenAccepted, upvoteContribution } = require('../db/queries/contributions');
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
