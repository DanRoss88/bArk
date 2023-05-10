const express = require('express');
const router = express.Router();
const { getStories } = require('../db/queries/stories');

/// **** BROWSE *** ////
router.get('/my-stories', async (req, res) => {

  try {
    const stories = await getStories(req.session.userid);
    const templateVars = { stories : stories, user: req.session.userid };
    res.status(200).render('mystories', templateVars);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
