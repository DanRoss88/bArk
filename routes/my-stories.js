const express = require('express');
const router = express.Router();
const storiesQueries = require('../db/queries/stories');

/// **** BROWSE *** //// 
/*router.get('/', (req, res) => {
  storiesQueries.seeStories(req.params.id)
    .then((data) => {
      const templateVars = {user : data.id,
        stories: data.body };
      res.render('my_stories', templateVars);
      })

      .catch(e => {
        console.error(e)
      });

}); */

module.exports = router;
