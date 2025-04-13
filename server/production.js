// Production entry point for Render deployment
const { createServer } = require('http');
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const { scrypt, randomBytes, timingSafeEqual } = require('crypto');
const path = require('path');
const { promisify } = require('util');
const connectPg = require('connect-pg-simple');
const { Pool } = require('pg');

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

// Auth helpers
const scryptAsync = promisify(scrypt);

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

// Passport config
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  try {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return done(null, false);
    }
    done(null, result.rows[0]);
  } catch (err) {
    done(err);
  }
});

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      // Find user
      const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
      if (result.rows.length === 0) {
        return done(null, false);
      }
      
      const user = result.rows[0];
      
      // Compare password
      const [hashed, salt] = user.password.split('.');
      const hashedBuf = Buffer.from(hashed, 'hex');
      const suppliedBuf = await scryptAsync(password, salt, 64);
      
      if (timingSafeEqual(hashedBuf, suppliedBuf)) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (err) {
      return done(err);
    }
  })
);

// Auth routes
app.post('/api/register', async (req, res, next) => {
  try {
    // Check if user exists
    const existingUser = await pool.query('SELECT * FROM users WHERE username = $1', [req.body.username]);
    if (existingUser.rows.length > 0) {
      return res.status(400).send('Username already exists');
    }

    // Hash password
    const salt = randomBytes(16).toString('hex');
    const buf = await scryptAsync(req.body.password, salt, 64);
    const hashedPassword = `${buf.toString('hex')}.${salt}`;

    // Create user
    const result = await pool.query(
      'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *',
      [req.body.username, hashedPassword]
    );
    
    const user = result.rows[0];

    req.login(user, (err) => {
      if (err) return next(err);
      res.status(201).json(user);
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating user' });
  }
});

app.post('/api/login', passport.authenticate('local'), (req, res) => {
  res.status(200).json(req.user);
});

app.post('/api/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.sendStatus(200);
  });
});

app.get('/api/user', (req, res) => {
  if (!req.isAuthenticated()) return res.sendStatus(401);
  res.json(req.user);
});

// Content API routes
app.get('/api/theories', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM theories');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener teorías' });
  }
});

app.get('/api/theories/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM theories WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Teoría no encontrada' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener la teoría' });
  }
});

app.get('/api/theories/category/:category', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM theories WHERE category = $1', [req.params.category]);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener las teorías por categoría' });
  }
});

app.get('/api/videos', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM videos');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener videos' });
  }
});

app.get('/api/videos/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM videos WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Video no encontrado' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener el video' });
  }
});

app.get('/api/expert-opinions', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM expert_opinions');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener opiniones de expertos' });
  }
});

app.get('/api/expert-opinions/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM expert_opinions WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Opinión no encontrada' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener la opinión' });
  }
});

// Serve static files
app.use(express.static(path.join(__dirname, '../dist')));

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