const express = require('express');
const { addStories } = require('../db/queries/stories');
const router  = express.Router();


/// *** BROWSE *** /// HOME ////
router.get('/', (req, res) => {
  const userId = req.session['user_id'];
  if (!userId) {
    return res.send({ error: "error" });
  }

  database
    .getStories(userId)
    .then((story) => res.send({story}))
    .catch((e) => {
      console.error(e);
      res.send(e);
    });

});

/// ** ADD (NEW) *** ///
router.get('/stories/:id', (req,res) => {

  const userId = req.session['user_id'];
  if (!userId) {
    return res.send({ error: "error" });
  }

  const templateVars = {
    user: userId,
    story_id: stories.id
  };
 return res.render('stories' ,templateVars)
});


router.post('/stories/:id', (req,res) => {
  const userId = req.session['user_id'];
  if (!userId) {
    return res.send({ error: "error" });
  }
  database
    .addStories(userId)
    .then(story => res.send(story));
});

/// ** EDIT ** ///
router.get('/stories/:id' , (req,res) => {
  const userId = req.session['user_id'];
  if (!userId) {
    return res.send({ error: "error" });
  }
  database
    .addContributionsToStory(userId)
    .then(story => res.send(story));

})

/// ** DELETE ** //
router.delete('/stories/:id', (req,res) => {
  const userId = req.session.userId;
  if (!userId) {
    return res.send({ error: "error" });
  }
database
    .deleteStories(userId)
    .then((story) => res.send({ story }))
    .catch((e) => {
      console.error(e);
      res.send(e);
    });
});
