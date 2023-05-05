const express = require('express');
const router = express.Router();
const storiesQueries = require('../db/queries/stories');


/// ** ADD (NEW) *** ///
router.get('/:id', (req, res) => {

  storiesQueries.getStories(req.params.id)
    .then((data) => {
      const templateVars = { stories: data };
      res.render('stories', templateVars);
    })
    .catch(e => {
      console.error(e)
    });
});


router.post('/:id', (req, res) => {


  storiesQueries.addStories(req.params.id)
    .then(data => {

      return res.send(data);
    })
    .catch(e => {
      console.error(e)
    });
});

/// ** EDIT ** ///
router.post('/:id', (req, res) => {

  storiesQueries.addContributionsToStory(req.params.id)
    .then((data) => {
      const templateVars = { stories: data };
      res.send(templateVars);
    })
    .catch(e => {
      console.error(e)
    });
});

/// ** DELETE ** //
router.post('/:id/delete', (req, res) => {

  storiesQueries.deleteStories(req.params.id)
  .then((data) => {
  res.send(data);
  return res.redirect('/my-stories');
})
.catch(e => {
  console.error(e)
});
});
module.exports = router;
