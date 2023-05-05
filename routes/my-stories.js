const express = require('express');
const storiesQueries = require('../db/queries/stories');

const router = express.Router();

/// **** BROWSE *** ////
router.get('/', (req, res) => {
  storiesQueries.seeStories(req.params.id)
    .then((data) => {
      const templateVars = {user : data.id,
        stories: data.body };
      res.render('my_stories', templateVars);
    });
});

