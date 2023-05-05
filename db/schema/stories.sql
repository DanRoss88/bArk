
DROP TABLE IF EXISTS stories CASCADE;
CREATE TABLE stories (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id),
  content TEXT NOT NULL,
  published_status BOOLEAN NOT NULL,
  date_created TIMESTAMP,
  date_published TIMESTAMP
);
