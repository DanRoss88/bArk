const db = require('../connection');
const express = require('express');

// Create new contribution

const newContribution = (user_id, story_id, content, accepted_status, num_of_upvotes) => {

  const queryString = `INSERT INTO contributions (user_id, story_id, content, accepted_status, num_of_upvotes)
  VALUES ($1, $2, $3, $4, $5) RETURNING *`;
  const values = [contributions.user_id, contributions.story_id, contributions.content, contributions.accepted_status, contributions.num_of_upvotes];

  return db.query(queryString, values)
    .then(data => {
      return data.rows[0];
    })
    .catch(err => {
      return console.error(err.stack);
    })
}

// Add contribution

const addContributions = () => {

  const queryString = `INSERT INTO contributions (user_id, story_id, content, accepted_status, num_of_upvotes) VALUES ($1, $2, $3, $4, $5) RETURNING *;`;
  const values = [contributions.user_id, contributions.story_id, contributions.content, contributions.accepted_status, contributions.num_of_upvotes];

  return db.query(queryString, values)
    .then(data => {
      return data.rows[0];
    })
    .catch(err => {
      console.error(err.stack);
      throw err;
    });
};


// Edit contribution

const editContribution = (contribution_id) => {

  const queryString = `UPDATE contributions
  SET contributions.content = $1 RETURNING *`;
  const values = [contributions.id, contributions.user_id, contributions.content];

  return db.query(queryString, values)
    .then(data => {
      return data.rows[0];
    })
    .catch(err => {
      return console.error(err.stack);
    })
}

// Delete contribution

const deleteContribution = (contribution_id, user_id) => {

  const queryString = `DELETE FROM contributions WHERE id = $1 AND user_id = $2`;
  const values = [contributions.id, contributions.user_id];

  return db.query(queryString, values)
    .then(data => {
      return data.rows;
    })
    .catch(err => {
      return console.error(err.stack);
    })
}

// Delete contribution when accepted

const deleteWhenAccepted = (user_id, story_id) => {

  const queryString = `DELETE FROM contributions JOIN stories ON stories.id = story_id WHERE accepted_status = true AND user_id = $1 AND story_id = $2`;
  const values = [contributions.user_id, contributions.story_id];

  return db.query(queryString, values)
    .then(data => {
      return data.rows;
    })
    .catch(err => {
      return console.error(err.stack);
    })
}

//Increment upvotes

const upvoteContribution = () => {

  const queryString = `UPDATE contributions
  SET num_of_upvotes = num_of_upvotes + 1 WHERE user_id = $1`;
  const values = [contributions.user_id];


  return db.query(queryString, values)
    .then(data => {
      return data.rows;
    })
    .catch(err => {
      return console.error(err.stack);
    })
}

//See contributions

const getContributions = () => {

  const queryString = `SELECT * FROM contributions JOIN stories ON stories.id = story_id GROUP BY stories.id, contributions.id LIMIT 10;`

  return db.query(queryString)
    .then(data => {
      return data.rows;
    })
    .catch(err => {
      return console.error(err.stack);
    })
}

module.exports = { newContribution, addContributions, editContribution, getContributions, deleteContribution, deleteWhenAccepted, upvoteContribution };
