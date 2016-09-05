DROP DATABASE IF EXISTS webapp;
CREATE DATABASE webapp;

\c webapp;

CREATE TABLE items(
       ID SERIAL PRIMARY KEY,
       name VARCHAR(40) not null,
       text VARCHAR(140),
       complete BOOLEAN
);

INSERT INTO items (name, text, complete)
       VALUES ('griffita', '', false);
