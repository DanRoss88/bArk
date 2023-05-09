const express = require('express');
const contributionsQueries = require('../db/queries/contributions');

const router = express.Router();


/// *** BROWSE *** /// HOME ////
router.get('/', (req, res) => {
  const userID = 1;
  req.session.user_id = userID;
  contributionsQueries.getContributions()
    .then((data) => {
      const templateVars = { contributions: data };
      res.render('index', templateVars);
    });
});

router.get('/my-stories/:user_id', (req, res) => {
  contributionsQueries.getContributions(req.params.id)
    .then((data) => {
      const templateVars = { contributions: data };
      res.render('my_stories', templateVars);
    });
});

/// ** ADD (NEW) *** ///
router.get('/:id', (req, res) => {
  contributionsQueries.getContributions(req.params.id)
    .then((data) => {
      const templateVars = { contributions: data };
      res.render('stories', templateVars);
    });
});

router.post('/:id', (req, res, next) => {

  const { user_id, story_id, content, accepted_status, num_of_upvotes } = req.body;

  contributionsQueries.newContribution(user_id, story_id, content, accepted_status, num_of_upvotes)
    .then(contribution => res.send(contribution))
    .catch(error => next(error));
});

/// ** EDIT ** ///
router.get('/:id', (req, res) => {
  contributionsQueries.editContribution(req.params.id)
    .then(contribution => res.send(contribution));
});

/// ** DELETE ** //
router.post('/:id/delete', (req, res) => {
  contributionsQueries.deleteContribution(req.params.id);
  return res.redirect('/my-stories');
});

/// ** DELETE (WHEN ACCEPTED) *** ///
router.get('/:id', (req, res) => {
  contributionsQueries.getContributions(req.params.id)
    .then((data) => {
      const templateVars = { contributions: data };
      res.render('stories', templateVars);
    });
});

router.post('/:id', (req, res) => {
  contributionsQueries.deleteWhenAccepted(req.params.id)
  return res.redirect('/my-stories');
});

/// ** UPVOTE *** ///
router.get('/:id', (req, res) => {
  contributionsQueries.getContributions(req.params.id)
    .then((data) => {
      const templateVars = { contributions: data };
      res.render('stories', templateVars);
    });
});

router.post('/:id', (req, res) => {
  contributionsQueries.upvoteContribution(req.params.id)
    .then(contribution => res.send(contribution));
});

module.exports = router;
