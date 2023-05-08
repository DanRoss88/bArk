const db = require('../connection');
const express = require('express');



const getStories = () => {
  return db.query(`SELECT * FROM stories ORDER BY date_created DESC LIMIT 10;`)
    .then(data => {
      return data.rows;
    })
    .catch(err => {
      return console.error(err.stack);
    })
};

const addStories = () => {

  const queryString = `INSERT INTO stories (stories.id as story_id, user_id, title, content, published_status, date_created)
 VALUES ($1, $2, $3, $4, $5, $6)
 RETURNING *;
`
const values = [
  story_id,
  user_id,
  stories.title,
 stories.content,
 stories.published_status,
 stories.date_created
];

return db.query(queryString, values)
 .then(data => {
  return data.rows
})
 .catch(err => {
  return console.error(err.stack)
});

};

const editStory = (story_id) => {

  const queryString = `UPDATE stories SET (stories.title, stories.content, stories.published_status) = VALUES($1, $2, $3) RETURNING *;`;
  const values = [stories.title, stories.content, stories.published_status];

  return db.query(queryString, values)
  .then(data => {
   return data.rows
 })
  .catch(err => {
   return console.error(err.stack)
 });
}


const addContributionToStory = (story_id) => {

  const queryString = `UPDATE stories SET stories.content = CONCAT(stories.content + contributions.content)
  JOIN contributions on story_id = stories.id;`;
  const queryString2 = `UPDATE contributions SET accepted_status = TRUE;`;

  return db.query(queryString, queryString2, values)
  .then(data => {
    return data.rows
  })
  .catch(err => {
    return console.error(err.stack)
  });
}


const deleteStories = (story_id) => {
  const queryString = `DELETE FROM stories WHERE stories.id = $1;`;
  const values = [stories.id];

  return db.query(queryString, values)
    .then(data => {
      return data.rows
    })
    .catch(err => {
      return console.error(err.stack)
    });
};

const seeStories = () => {
const queryString = `SELECT * FROM stories WHERE users.id = $1 ORDER BY date_created DESC;`;
  const values = [users.id];

  return db.query(queryString, values)
    .then(data => {
      return data.rows;
    })
    .catch(err => {
      return console.error(err.stack);
    })
}


const publishStory = (story_id) => {

  const queryString = `UPDATE stories SET published_status = TRUE WHERE stories.id = $1`;
  const values = [stories.id, published_status];

  return db.query(queryString, values)
  .then(data => {
    return data.rows
  })
  .catch(err => {
    return console.error(err.stack)
  });
}

module.exports = { getStories, addStories, editStory, addContributionToStory, deleteStories, seeStories, publishStory };
