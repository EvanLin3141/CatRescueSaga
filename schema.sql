DROP TABLE IF EXISTS score_board;

CREATE TABLE score_board
(
    user INTEGER PRIMARY KEY,
    kitten INTEGER NOT NULL,
    coin INTEGER NOT NULL,
    slime INTERGER NOT NULL,
    score INTEGER NOT NULL
);

DROP TABLE IF EXISTS users;

CREATE TABLE users
(
    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    password TEXT NOT NULL
);
