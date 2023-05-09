const db = require('../connection');
const express = require('express');

// Add new contribution

const newContribution = (user_id, story_id, content, accepted_status, num_of_upvotes) => {
  return db.query(`INSERT INTO contributions (user_id, story_id, content, accepted_status, num_of_upvotes)
  VALUES ($1, $2, $3, $4, $5) RETURNING *`, [user_id, story_id, content, accepted_status, num_of_upvotes])
    .then(data => {
      return data.rows[0];
    })
    .catch(err => {
      return console.error(err.stack);
    })
}

// Edit contribution

const editContribution = (id, user_id, content) => {
  return db.query(`UPDATE contributions
  SET content = $1 RETURNING *`, [id, user_id, content])
    .then(data => {
      return data.rows[0];
    })
    .catch(err => {
      return console.error(err.stack);
    })
}

// Delete contribution

const deleteContribution = (id, user_id) => {
  return db.query(`DELETE FROM contributions WHERE id = $1 AND user_id = $2`, [id, user_id])
    .then(data => {
      return data.rows;
    })
    .catch(err => {
      return console.error(err.stack);
    })
}

// Delete contribution when accepted

const deleteWhenAccepted = (user_id, story_id) => {
  return db.query(`DELETE FROM contributions JOIN stories ON stories(id) = story_id WHERE accepted_status = true AND user_id = $1 AND story_id = $2`, [user_id, story_id])
    .then(data => {
      return data.rows;
    })
    .catch(err => {
      return console.error(err.stack);
    })
}

//Increment upvotes

const upvoteContribution = () => {
  return db.query(`UPDATE contributions
  SET num_of_upvotes = num_of_upvotes + 1 WHERE user_id = $1`, [user_id])
    .then(data => {
      return data.rows;
    })
    .catch(err => {
      return console.error(err.stack);
    })
}

//See contributions

const getContributions = () => {
  return db.query(`SELECT * FROM contributions JOIN stories ON stories(id) = story_id GROUP BY story_id LIMIT 10;`)
    .then(data => {
      return data.rows;
    })
    .catch(err => {
      return console.error(err.stack);
    })
}

module.exports = { newContribution, editContribution, getContributions, deleteContribution, deleteWhenAccepted, upvoteContribution };