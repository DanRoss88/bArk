const db = require('../connection');

const getStories = () => {
  return db.query(`SELECT * FROM stories ORDER BY date_created DESC LIMIT 10;`)
    .then(data => {
      return data.rows;
    })
    .catch(err => {
      console.error("Error for getStories", err);
      throw err;
    })
};
const getUserStoriesByUserId = (user_id, story) => {
  const queryString = `SELECT stories
  FROM stories
  JOIN users ON users.id = stories.user_id
  WHERE users.id = $1
  ORDER BY stories.id
  LIMIT 1;`
    ;
  const values = [user_id, story];

  return db.query(queryString, values)
    .then(data => {
      console.log(data);
      return data.rows;
    });
};
// const addStories = (stories) => {

//   const queryString = `INSERT INTO stories (title, content, published_status, date_created)
//   VALUES ($1, $2, FALSE, NOW())
//   RETURNING *;`;
//   const values = [
//     stories.title,
//     stories.content
//   ];
//   console.log(values);
//   return db.query(queryString, values)
//     .then(data => {
//       return data.rows[0];
//     })
//     .catch(err => {
//       console.error("Error for addStories", err);
//       throw err;
//     });
// };

const addStories = (stories) => {

  const queryString = `INSERT INTO stories (user_id, title, content, published_status, date_created)
  VALUES ($1, $2, $3, FALSE, NOW())
  RETURNING *;`;
const values = [
  stories.user_id,
  stories.title,
 stories.content
];
console.log(values);
return db.query(queryString, values)
 .then(data => {
  return data.rows[0];
})
 .catch(err => {
  console.error("Error for addStories", err);
  throw err;
});
};

const editStory = (story) => {

  const queryString = `UPDATE stories SET title = $1, content = $2 WHERE id = $3 RETURNING *;`;
  const values = [story.title, story.content, story.id]
  return db.query(queryString, values)
    .then(data => {
      console.log(data);
      return data.rows[0];
    })
    .catch(err => {
      console.error("Error on editStory", err);
      throw err;
    });
};
const getStoryById = (storyId) => {
  const queryString = 'SELECT * FROM stories WHERE id = $1;';
  const values = [storyId];
  return db.query(queryString, values)
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      console.error('Error getting story by ID', err);
      throw err;
    });
};

// const addContributionToStory = (story_id, contribution) => {

//   const queryString1 = `UPDATE stories
//     SET content = content || (SELECT content FROM contributions WHERE story_id = $1 AND accepted_status = FALSE)
//     WHERE id = 1;`;

//   const queryString2 = `UPDATE contributions
//     SET accepted_status = TRUE
//     WHERE story_id = $1;`;

//   const values = [story_id, contribution];

//   return db.query(queryString1, values)
//     .then(() => {
//       return db.query(queryString2, values);
//     })
//     .then(() => {
//       return { success: true };
//     })
//     .catch(err => {
//       console.error('Error on addContributionToStory', err);
//       throw err;
//     });
// }




const deleteStory = (storyId) => {
  const queryString = `DELETE FROM stories WHERE id = $1;`;
  const values = [storyId];

  return db.query(queryString, values)
    .then(data => {
      console.log(data);
      return data.rows[0];
    })
    .catch(err => {
      console.error("Error on deleteStories", err);
      throw err;
    });
};

const seeStory = (storyId) => {
  const query = 'SELECT * FROM stories WHERE id = $1;';
  const values = [storyId];

  return db.query(query, values)
    .then((result) => {
      if (result.rows.length === 0) {
        throw new Error('Story not found');
      }

      return result.rows[0];
    })
    .catch((err) => {
      throw new Error("Error on seeStory", err);
    });
};



const publishStory = (story_id) => {

  const queryString = `UPDATE stories SET published_status = TRUE WHERE id = 1 RETURNING *;`;
  const values = [story_id];

  return db.query(queryString, values)
    .then(data => {
      console.log(data);
      return data.rows[0];
    })
    .catch(err => {
      console.error("Error on publishStory", err);
      throw err;
    });
}

module.exports = {
   getStories, getUserStoriesByUserId, addStories, editStory, //addContributionToStory,
  seeStory, deleteStory, getStoryById,
  publishStory
};
