\c albums_dev;

INSERT INTO albums (album_name, album_artist, debut_date, label, is_favorite) 
VALUES
('Baduizm', 'Erykah Badu', '1997-02-11', 'Kedar Entertainment/Universal Records', true ),
('Im Breathless', 'Madonna', '1990-05-22', 'Warner Brothers', false),
('Dangerously in Love', 'Beyonce', '2003-06-22', 'Columbia Records', true);



INSERT INTO songs (album_id, song_name, artist, album, time, is_favorite)
VALUES
(3, 'Like a Virgin', 'Madonna', 'Like a Virgin', '3.38', true),
(3, 'Vogue', 'Madonna', 'Breathless', '5.16', true),
(1, 'On and On', 'Eryka Badu', 'Baduizm', '3.45', true),
(1, 'Love of my Life: An Ode to Hip-Hop', 'Eryka Badu', 'WorldWide Underground', '3.50', true),
(2, 'Crazy in Love', 'Beyonce', 'Dangerously in Love', '3.26', false),
(null, 'I Walk the Line', 'Johnny Cash', 'I Walk the Line', null, false),
(2, 'Naughty Girl', 'Beyonce', 'Dangerously in Love', null, false),
(1, 'Strut', 'Madonna', 'Breathless', '15.16', false);