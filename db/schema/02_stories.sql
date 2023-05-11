
DROP TABLE IF EXISTS stories CASCADE;
CREATE TABLE stories (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id),
  title VARCHAR(255),
  content TEXT,
  published_status BOOLEAN NOT NULL DEFAULT FALSE,
  date_created TIMESTAMP
);
