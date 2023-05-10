/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');

const router = express.Router();
const getUsers = require('../db/queries/users');


router.get('/', (req, res) => {
  getUsers()
    .then((users) => {
      res.render('users')

    })
    .catch((err) => console.log("Error for getUsers", err));

});
router.get('/:id', (req, res) => {

  const userid = req.session.userid;
  getUserStoriesById(userid)
    .then((myStories) => {
    console.log(myStories);
    res.render(myStories);
  })
  .catch((err) => console.log("getUserStoriesById", err));
});


module.exports = router;
