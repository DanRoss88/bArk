const express = require('express');
const storiesQueries = require('../db/queries/stories');

const router = express.Router();



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
    .then(data => {

      return res.send(data);
    });
});

/// ** EDIT ** ///
router.post('/:id', (req, res) => {

  storiesQueries.addContributionsToStory(req.params.id)
    .then((data) => {
      const templateVars = { stories: data };
      res.send(templateVars);
    });
});

/// ** DELETE ** //
router.post('/:id/delete', (req, res) => {

  storiesQueries.deleteStories(req.params.id)
  .then((data) => {
  res.send(data);
  return res.redirect('/my-stories');
})
});
module.exports = router;
