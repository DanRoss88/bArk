const express = require('express');
const storiesQueries = require('../db/queries/stories');

const router = express.Router();


/// *** BROWSE *** /// HOME ////
router.get('/', (req, res) => {
  storiesQueries.getStories()
    .then((data) => {
      const templateVars = { stories: data };
      res.render('home', templateVars);
    });
});

router.get('/', (req, res) => {
  storiesQueries.seeStories(req.params.id)
    .then((data) => {
      const templateVars = { stories: data };
      res.render('my_stories', templateVars);
    });
});

/// ** ADD (NEW) *** ///
router.get('/:id', (req, res) => {

  storiesQueries.getStories(req.params.id)
    .then((data) => {
      const templateVars = { stories: data };
      res.render('stories', templateVars);
    });
});


router.post('/:id', (req, res) => {


    storiesQueries.addStories(req.params.id)
    .then(story => res.send(story));
});

/// ** EDIT ** ///
router.get('/:id', (req, res) => {
  const userId = req.session['user_id'];
  if (!userId) {
    return res.send({ error: "error" });
  }
  database
    .addContributionsToStory(userId)
    .then(story => res.send(story));

});

/// ** DELETE ** //
router.post('/:id/delete', (req, res) => {
  const userId = req.session.userId;
  if (!userId) {
    return res.send({ error: "error" });
  }
  storiesQueries.deleteStories(req.params.id);
  return res.redirect('/my-stories');
});

module.exports = router;
