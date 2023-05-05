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
