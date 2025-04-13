const { createServer } = require('http');
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const path = require('path');
const { Pool } = require('pg');
const connectPg = require('connect-pg-simple');

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

// Setup app
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Session store
const PostgresSessionStore = connectPg(session);
const sessionStore = new PostgresSessionStore({ 
  pool,
  createTableIfMissing: true 
});

// Configure session
const sessionSettings = {
  secret: process.env.SESSION_SECRET || 'default-secret-for-development-only',
  resave: false,
  saveUninitialized: false,
  store: sessionStore,
  cookie: {
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    secure: process.env.NODE_ENV === 'production'
  }
};

app.set('trust proxy', 1);
app.use(session(sessionSettings));
app.use(passport.initialize());
app.use(passport.session());

// Serve static files
app.use(express.static(path.join(__dirname, '../dist')));

// Import routes
require('./routes')(app);

// Serve SPA for any other request
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist', 'index.html'));
});

// Start server
const port = process.env.PORT || 5000;
const server = createServer(app);

server.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
});