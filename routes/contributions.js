const express = require('express');
const { newContribution, addContributions, editContribution, getContributions, deleteContribution, deleteWhenAccepted, upvoteContribution } = require('../db/queries/contributions');

const router = express.Router();


/// *** BROWSE *** /// HOME ////

router.get('/', async (req, res) => {
  // const userID = 1;
  // req.session.user_id = userID;

  try {
    const contributions = await getContributions();
    const templateVars = { contributions };
    res.render('index', templateVars);
  } catch (err) {
    console.log(err);
    res.status(500).send("Unable to retrieve contributions");
    }

});

// ALL CONTRIBUTIONS

router.get('/contributions', async (req, res) => {
  try {
    const contributions = await getContributions();
    res.status(200).json(contributions);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// GET USER'S PERSONAL CONTRIBUTIONS

router.get('/users/:id/contributions', async (req, res) => {
  const user_id = req.params.id;

  try {
    const contributions = await getContributions(user_id);
    res.status(200).json(contributions);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

/// ** CREATE NEW CONTRIBUTION *** ///
router.post('/stories/contributions', async (req, res, next) => {

  const { user_id, story_id, content, accepted_status, num_of_upvotes } = req.body;

  try {
    const newContribution = await newContribution(user_id, story_id, content, accepted_status, num_of_upvotes);
    res.status(201).json(newContribution);
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
