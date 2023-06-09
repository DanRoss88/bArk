DROP TABLE IF EXISTS contributions CASCADE;
CREATE TABLE contributions (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  story_id INTEGER REFERENCES stories(id) ON DELETE CASCADE,
  content TEXT,
  accepted_status BOOLEAN DEFAULT FALSE,
  num_of_upvotes INTEGER DEFAULT 0
);

