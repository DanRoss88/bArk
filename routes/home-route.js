const express = require('express');
const router = express.Router();
const storiesQueries = require('../db/queries/stories');

/// *** BROWSE *** /// HOME ////
router.get('/', (req, res) => {
  storiesQueries.getStories()
    .then((data) => {
      const templateVars = { stories: data };
      res.render('index', templateVars);
    })
    .catch(e => {
      console.error(e)
    });
});

module.exports = router;
