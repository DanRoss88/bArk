const db = require('../connection');

const getStories = () => {
  return db.query(`SELECT * FROM stories ORDER BY date_created DESC LIMIT 10;`)
    .then(data => {
      return data.rows;
    })
    .catch(err => {
     console.error(err.stack);
     throw err;
    })
};

const addStories = (stories) => {

  const queryString = `INSERT INTO stories (user_id, title, content, published_status, date_created)
  VALUES ($1, $2, $3, $4, $5)
  RETURNING stories.id, user_id, title, content, published_status, date_created;`
const values = [
 stories.user_id,
  stories.title,
 stories.content,
 stories.published_status,
 new Date()
];

return db.query(queryString, values)
 .then(data => {
  return data.rows[0];
})
 .catch(err => {
  console.error(err.stack);
  throw err;
});
};

const editStory = (story_id, stories) => {

  const queryString = `UPDATE stories SET title = $2, content = $3, published_status = $4 WHERE id = $1 RETURNING *;`;
  const values = [story_id, stories.title, stories.content, stories.published_status];

  return db.query(queryString, values)
  .then(data => {
   return data.rows[0];
 })
  .catch(err => {
   console.error(err.stack);
   throw err;
 });
}


const addContributionToStory = (story_id, contribution) => {

  const queryString1 = `UPDATE stories
    SET content = content || (SELECT content FROM contributions WHERE story_id = $1 AND accepted_status = FALSE)
    WHERE id = $1;`;

  const queryString2 = `UPDATE contributions
    SET accepted_status = TRUE
    WHERE story_id = $1;`;

  const values = [story_id];

  return db.query(queryString1, values)
    .then(() => {
      return db.query(queryString2, values);
    })
    .then(() => {
      return { success: true };
    })
    .catch(err => {
      console.error(err.stack);
      throw err;
    });
}


const deleteStories = (story_id) => {
  const queryString = `DELETE FROM stories WHERE id = $1;`;
  const values = [story_id];

  return db.query(queryString, values)
    .then(data => {
      return data.rows[0];
    })
    .catch(err => {
      console.error(err.stack);
      throw err;
    });
};

const seeStories = (user_id) => {
const queryString = `SELECT * FROM stories WHERE users.id = $1 ORDER BY date_created DESC;`;
  const values = [user_id];

  return db.query(queryString, values)
    .then(data => {
      return data.rows;
    })
    .catch(err => {
      console.error(err.stack);
      throw err;
    })
}


const publishStory = (story_id) => {

  const queryString = `UPDATE stories SET published_status = TRUE WHERE id = $1 RETURNING *;`;
  const values = [story_id];

  return db.query(queryString, values)
  .then(data => {
    return data.rows[0];
  })
  .catch(err => {
    console.error(err.stack);
    throw err;
  });
}

module.exports = { getStories, addStories, editStory, addContributionToStory, deleteStories, seeStories, publishStory };
