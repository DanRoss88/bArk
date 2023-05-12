const express = require('express');


const { addContributions, addContributionToStory, getContributions, acceptContribution } = require('../db/queries/contributions');

const router = express.Router();


/// *** BROWSE *** /// HOME ////

router.get('/', async (req, res) => {

  try {
    const contributions = await getContributions();
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
    await addContributions(contributions);
    res.redirect('/stories');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error adding a contribution');
  }
});


/// ACCEPT CONTRIBUTION ///
router.post('/:id/accept', async (req, res) => {
  const contributionId = req.params.id;
  const storyId = req.body.storyId;
  const content = req.body.content;

  try {
    await acceptContribution(contributionId);
    await addContributionToStory(contributionId, storyId, content);
    res.status(200).json({ message: 'Contribution accepted and added to the story' });
  } catch (err) {
    console.error('Error accepting contribution:', err);
    res.status(500).send('Server error accepting contribution');
  }
});

module.exports = router;
