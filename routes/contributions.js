const express = require('express');
const { addContributions, editContribution, getContributions, deleteContribution, deleteWhenAccepted, upvoteContribution } = require('../db/queries/contributions');
const { getUsers, getUsersById, getUsersByEmail } = require('../db/queries/users');
const router = express.Router();
const bodyParser = require('body-parser');


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


// // ALL CONTRIBUTIONS

// router.get('/contributions', async (req, res) => {
//   try {
//     const contributions = await getContributions();
//     res.status(200).json(contributions);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Server error');
//   }
// });

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
router.post('/', async (req, res) => {

  const user_email = req.session.email;
  const { id } = await getUsersByEmail(user_email);
  const story_id= req.session.storyid;
  const content = req.body.content;

  const contributions = {
    user_id: id,
    story_id,
    content
  };

  try {
    const newContribution = await addContributions(contributions)
    res.status(200).json(newContribution);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error adding a contribution');
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
