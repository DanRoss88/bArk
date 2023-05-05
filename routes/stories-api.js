const express = require('express');
const router  = express.Router();
const storiesQueries = require('../db/queries/stories');

router.get('/', (req, res) => {
  userQueries.getStories()
    .then(story => {
      res.json({ story });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});
