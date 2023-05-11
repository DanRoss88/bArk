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


const deleteStory = (storyId) => {
  const queryString = `DELETE * FROM stories WHERE id = $1;`;
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
  const queryString = 'UPDATE stories SET published_status = TRUE WHERE id = $1 RETURNING *;';
  const values = [story_id];

  return db.query(queryString, values)
    .then(data => {
      console.log(data);
      return data.rows[0];
    })
    .catch(err => {
      console.error('Error on publishStory', err);
      throw err;
    });
}



const getStoriesWithContributions = async function (userId) {
  const queryString = `
    SELECT stories.*,
           contributions.content AS contribution_content,
           contributions.user_id AS contribution_user_id,
           contributions.id AS contribution_id
    FROM stories
    LEFT JOIN contributions ON stories.id = contributions.story_id
    WHERE stories.published_status = true
    AND (stories.user_id = $1 OR contributions.user_id = $1)
    ORDER BY stories.date_created DESC;
  `;

  try {
    const result = await db.query(queryString, [userId]);
    const storiesWithContributions = result.rows.reduce((acc, row) => {
      const story = acc.find(story => story.id === row.id);
      if (story) {
        story.contributions.push({
          id: row.contribution_id,
          user_id: row.contribution_user_id,
          content: row.contribution_content,
        });
      } else {
        acc.push({
          id: row.id,
          user_id: row.user_id,
          title: row.title,
          content: row.content,
          published_status: row.published_status,
          date_created: row.date_created,
          contributions: row.contribution_content ? [
            {
              id: row.contribution_id,
              user_id: row.contribution_user_id,
              content: row.contribution_content,
            }
          ] : []
        });
      }
      return acc;
    }, []);
    return storiesWithContributions;
  } catch (err) {
    console.error(err);
    throw new Error('Error getting stories with contributions');
  }
}

const acceptContribution = (contributionId) => {
  const queryString = `
    UPDATE contributions
    SET accepted_status = true
    WHERE id = $1
    RETURNING *
  `;
  const values = [contributionId];
  return db.query(queryString, values)
    .then(data => {
      console.log(data.rows[0]);
      return data.rows[0];
    })
    .catch(err => {
      console.error('Error accepting contribution:', err);
      throw err;
    });
}

module.exports = {
  getStories, getUserStoriesByUserId, acceptContribution, addStories, editStory,
  seeStory, deleteStory, getStoryById, getStoriesWithContributions,
  publishStory
};
