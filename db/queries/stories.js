const db = require('../connection');

const getStories = () => {
  return db.query('SELECT * FROM stories;')
    .then(data => {
      return data.rows[0];
    })
    .catch(err => {
      return err('Error');
    })
};

module.exports = { getStories };
