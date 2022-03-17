-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`

DROP TABLE IF EXISTS libraries;

CREATE TABLE libraries (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    url TEXT NOT NULL,
    description TEXT NOT NULL
);

INSERT INTO 
    libraries (name, url, description)
VALUES
    ('tone.js', 'https://tonejs.github.io/', 'Tone.js is a super neat-o library.'),
    ('p5.js', 'https://p5js.org/', 'p5.js is a JavaScript library for creative coding, with a focus on making coding accessible and inclusive for artists, designers, educators, beginners, and anyone else!');