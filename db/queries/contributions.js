const db = require('../connection');
const express = require('express');

// Create new contribution

// const newContribution = (user_id, story_id, content, accepted_status, num_of_upvotes) => {

//   const queryString = `INSERT INTO contributions (user_id, story_id, content, accepted_status, num_of_upvotes)
//   VALUES ($1, $2, $3, $4, $5) RETURNING *`;
//   const values = [contributions.user_id, contributions.story_id, contributions.content, contributions.accepted_status, contributions.num_of_upvotes];

//   return db.query(queryString, values)
//     .then(data => {
//       return data.rows[0];
//     })
//     .catch(err => {
//       return console.error(err.stack);
//     })
// }

// Add contribution

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
    // const { contributionId, storyId } = contribution;

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
    console.log('#1 VALUES:', values);

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


// Edit contribution

const editContribution = (contribution) => {

  const queryString = `UPDATE contributions
  SET contributions.content = $1 RETURNING *`;
  const values = [contribution.content, contribution.id, contribution.user_id];

  return db.query(queryString, values)
    .then(data => {
      return data.rows[0];
    })
    .catch(err => {
      return console.error(err.stack);
    })
}

// Delete contribution

const deleteContribution = (contribution) => {

  const queryString = `DELETE FROM contributions WHERE id = $1 AND user_id = $2`;
  const values = [contribution.id, contribution.user_id];

  return db.query(queryString, values)
    .then(data => {
      return data.rows;
    })
    .catch(err => {
      return console.error(err.stack);
    })
}

// Delete contribution when accepted

const deleteWhenAccepted = (contribution) => {

  const queryString = `DELETE FROM contributions WHERE accepted_status = true AND user_id = $1 AND story_id = $2`;
  const values = [contribution.user_id, contribution.story_id];

  return db.query(queryString, values)
    .then(data => {
      return data.rows;
    })
    .catch(err => {
      return console.error(err.stack);
    })
}

//Increment upvotes

const upvoteContribution = (contribution) => {

  const queryString = `UPDATE contributions
  SET num_of_upvotes = num_of_upvotes + 1 WHERE user_id = $1`;
  const values = [contribution.user_id];


  return db.query(queryString, values)
    .then(data => {
      return data.rows;
    })
    .catch(err => {
      return console.error(err.stack);
    })
}

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

module.exports = { addContributions, editContribution, getContributions, acceptContribution, checkAllContributionsAccepted, deleteContribution, addContributionToStory, deleteWhenAccepted, upvoteContribution };
