const express = require('express');
const router = express.Router();
const { getUsers, getUsersById } = require('../db/queries/users');

// GET LOGIN ROUTE

router.get('/', (req, res) => {
  res.render('login')
});

router.post('/', (req, res) => {
  
  req.session.email = req.body.email;
  res.redirect('/stories')

});


module.exports = router;
