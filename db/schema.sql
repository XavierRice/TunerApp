DROP DATABASE IF EXISTS albums_dev;
CREATE DATABASE albums_dev;

\c albums_dev;

CREATE TABLE albums (
id SERIAL PRIMARY KEY,
album_name TEXT NOT NULL,
album_artist TEXT NOT NULL,
debut_date DATE DEFAULT NULL,
label TEXT DEFAULT NULL,
is_favorite BOOLEAN
);

DROP TABLE IF EXISTS songs;

CREATE TABLE songs (
 id SERIAL PRIMARY KEY,
 song_name TEXT NOT NULL,
 artist TEXT NOT NULL,
 album TEXT,
 time TEXT,
 is_favorite BOOLEAN,
 album_id INTEGER REFERENCES albums (id)
 DELETE ON CASCADE 
);

