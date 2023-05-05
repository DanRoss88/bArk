
DROP TABLE IF EXISTS stories CASCADE;
CREATE TABLE stories (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id),
  title VARCHAR(255) NOT NULL;
  content TEXT NOT NULL,
  published_status BOOLEAN NOT NULL DEFAULT false,
  date_created TIMESTAMP
);
