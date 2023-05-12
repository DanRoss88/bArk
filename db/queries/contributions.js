const db = require('../connection');

const addContributions = (contributions) => {

  const queryString = `INSERT INTO contributions (user_id, story_id, content, accepted_status, num_of_upvotes) VALUES ($1, $2, $3, FALSE, 0) RETURNING *;`;
  const values = [contributions.user_id, contributions.story_id, contributions.content];

  return db.query(queryString, values)
    .then(data => {
      return data.rows[0];
    })
    .catch(err => {
      console.error('Error for addContributions', err);
      throw err;
    });
};

//// CHECK CONTRIBUTIONS ////
const checkAllContributionsAccepted = async (story_id) => {
  const queryString = `
    SELECT COUNT(*) as num_contributions, SUM(accepted_status::int) as num_accepted_contributions
    FROM contributions
    WHERE story_id = $1;
  `;
  const values = [story_id];

  const result = await db.query(queryString, values);
  const numContributions = parseInt(result.rows[0].num_contributions);
  const numAcceptedContributions = parseInt(result.rows[0].num_accepted_contributions);

  return numContributions === numAcceptedContributions;
}

/// accept contribution////
const acceptContribution = (contribution_id) => {
  const queryString = `UPDATE contributions SET accepted_status = TRUE WHERE id = $1 RETURNING *;`;
  const values = [contribution_id];

  return db.query(queryString, values)
    .then(data => {
      console.log(data);
      return data.rows[0];
    })
    .catch(err => {
      console.error("Error on acceptContribution", err);
      throw err;
    });
}

// add contribution to story


  const addContributionToStory = (contributionId, storyId) => {

    const query = `
      UPDATE stories
      SET content = CONCAT(stories.content,
        (SELECT content FROM contributions WHERE id = $1))
        WHERE id = $2

    `;

    const values = [
      contributionId,
      storyId
    ];

    return db.query(query, values)
      .then(res => {
        console.log('Successfully added contribution to story');
        return res.rows[0];
      })
      .catch(err => {
        console.error('Error adding contribution to story:', err);
        throw err;
      });
  };


//See contributions

const getContributions = (storyId, limit=5) => {

  const queryString = `SELECT contributions.id, contributions.content FROM contributions WHERE story_id = $1 ORDER BY contributions.id DESC LIMIT $2;`

  return db.query(queryString, [storyId, limit])
    .then(data => {
      return data.rows;
    })
    .catch(err => {
      return console.error(err.stack);
    })
};

module.exports = { addContributions, getContributions, acceptContribution, checkAllContributionsAccepted, addContributionToStory };
