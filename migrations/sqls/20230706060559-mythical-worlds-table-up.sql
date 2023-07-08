CREATE TABLE IF NOT EXISTS mythical_weapons (name VARCHAR(100), type VARCHAR(100), id SERIAL PRIMARY KEY);
CREATE TABLE IF NOT EXISTS users (username VARCHAR(100), password_digest VARCHAR, id SERIAL PRIMARY KEY);
CREATE TABLE IF NOT EXISTS books (title VARCHAR(100), author VARCHAR(100), totalPages integer, summary text, id SERIAL PRIMARY KEY);