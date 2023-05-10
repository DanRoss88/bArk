const db = require('../connection');

const getUsers = () => {
  return db.query('SELECT * FROM users;')
    .then(data => {
      return data.rows;
    });
};

const getUsersById = (id) => {
  return db.query(`SELECT * FROM users WHERE users.id = 1 RETURNING *`, [id])
  .then((data) => {
    return data.rows[0];
  });
};

module.exports = { getUsers, getUsersById };
