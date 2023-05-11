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

const getUsersByEmail = (email) => {
  return db.query(`SELECT * FROM users WHERE email = $1`, [email])
    .then((result) => {
      return result.rows[0];
    });
};

getUsersByEmail('bigdog1@example.com');

module.exports = { getUsers, getUsersById, getUsersByEmail };
