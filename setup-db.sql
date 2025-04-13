-- Drop tables if they exist
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS theories CASCADE;
DROP TABLE IF EXISTS videos CASCADE;
DROP TABLE IF EXISTS expert_opinions CASCADE;

-- Create users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL
);

-- Create theories table
CREATE TABLE theories (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  image_url TEXT,
  author TEXT
);

-- Create videos table
CREATE TABLE videos (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  thumbnail_url TEXT,
  video_url TEXT NOT NULL,
  duration TEXT,
  author TEXT,
  views INTEGER DEFAULT 0
);

-- Create expert_opinions table
CREATE TABLE expert_opinions (
  id SERIAL PRIMARY KEY,
  expert_name TEXT NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  institution TEXT,
  image_url TEXT,
  date TEXT
);