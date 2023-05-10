const express = require('express');
const router = express.Router();
const { getUsers, getUsersById } = require('../db/queries/users');

// GET LOGIN ROUTE

router.get('/', (req, res) => {
  res.render('login')
});

router.post('/', (req, res) => {
  req.session.userid = req.body.userid;
  res.redirect('/stories')
});

// router.get('/login/:id', (req, res) => {
//   // using encrypted cookies
//   const user_id = req.params.id;
//   req.session.user_id = user_id;

//   console.log('TEST:', `user_id set to ${req.session.user_id}`);

//   // send the user somewhere
//   res.redirect('/');
// });

module.exports = router;
