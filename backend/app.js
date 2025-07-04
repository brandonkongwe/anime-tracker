const express = require('express');
const cors = require('cors');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const dotenv = require('dotenv');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const axios = require('axios');

dotenv.config();
const app = express();

// database
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect((err) => {
    if (err) throw err;
    console.log('MySQL connected');
});

// session store
const options = new MySQLStore({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  clearExpired: true,
  createDatabaseTable: true,
  charset: 'utf8mb4_bin',
	schema: {
		tableName: 'sessions',
		columnNames: {
			session_id: 'session_id',
			expires: 'expires',
			data: 'data'
		}}
});


// middleware
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));

app.use(express.json());

// session
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: options,
    cookie: {
        secure: false,
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true
    }
}));

// routes

// POST /register
app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
    db.query(query, [username, email, hashedPassword], (err, result) => {
        if (err) return res.status(400).json({ message: 'Registration failed' });
        res.status(201).json({ message: 'Registration successful' });
    });
});

// POST /login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const query = 'SELECT * FROM users WHERE username = ?';
  db.query(query, [username], async (err, results) => {
    if (err || results.length === 0) return res.status(400).json({ message: 'Invalid credentials' });

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    req.session.userId = user.id; // store user ID in session
    console.log('Session after login:', req.session);
    console.log("Session ID: ", req.sessionID);
    res.json({ message: 'Logged in', user });
  });
});

// POST /logout
app.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ message: 'Failed to logout' });
    res.clearCookie('connect.sid');
    res.json({ message: 'Logged out successfully' });
  });
});


// GET /anime-list
app.get('/anime-list', (req, res) => {
    console.log('Session in /anime-list:', req.session);
    console.log("Session ID: ", req.sessionID);
    if (!req.session.userId) return res.status(401).json({ message: 'Unauthorized' });

    const query = 'SELECT * FROM anime_list WHERE user_id = ?';
    db.query(query, [req.session.userId], (err, results) => {
        if (err) return res.status(500).json({ message: 'Failed to fetch anime list' });
        res.json(results);
    });
});


// GET /search-anime
// search for anime using Jikan API
app.get('/search-anime', async (req, res) => {
  const { query, limit = 3 } = req.query; // only 3 results coz of rate limiting

  try {
    const response = await axios.get(`https://api.jikan.moe/v4/anime`, {
      params: { q: query, limit },
    });
    res.json(response.data);
  } catch (err) {
    console.error('Error searching anime:', err);
    res.status(500).json({ message: 'Failed to search anime' });
  }
});

// POST /add-anime
app.post('/add-anime', (req, res) => {
  console.log('Session in POST /add-anime:', req.session);
  console.log("Session ID: ", req.sessionID);

  
  // check if user is authenticated
  if (!req.session.userId) {return res.status(401).json({ message: 'Unauthorized' });}

  const { anime_id, title, status, episodes_watched, rating, notes, image_url } = req.body;
  
  // add type conversion for numeric fields
  const episodesWatched = parseInt(episodes_watched, 10) || 0;
  const ratingValue = parseFloat(rating) || 0;
  
  console.log('Adding anime with data:', {
      user_id: req.session.userId,
      anime_id,
      title,
      status,
      episodes_watched: episodesWatched,
      rating: ratingValue,
      notes,
      image_url
  });
  
  const query = 'INSERT INTO anime_list (user_id, anime_id, title, status, episodes_watched, rating, notes, image_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
  
  db.query(
      query,
      [req.session.userId, anime_id, title, status, episodesWatched, ratingValue, notes, image_url],
      (err, result) => {
          if (err) {
              console.error('Database error:', err);
              return res.status(500).json({ 
                  message: 'Failed to add anime', 
                  error: err.message 
              });
          }
          
          return res.status(201).json({ 
              message: 'Anime added to list',
              id: result.insertId 
          });
      }
  );
});


// PUT /anime-list/:id
app.put('/anime-list/:id', (req, res) => {
  if (!req.session.userId) return res.status(401).json({ message: 'Unauthorized' });

  const { status, episodes_watched, rating, notes } = req.body;

  const query =
    'UPDATE anime_list SET status = ?, episodes_watched = ?, rating = ?, notes = ? WHERE id = ? AND user_id = ?';
  db.query(
    query,
    [status, episodes_watched, rating, notes, req.params.id, req.session.userId],
    (err, result) => {
      if (err) return res.status(500).json({ message: 'Failed to update anime' });
      res.json({ message: 'Anime updated' });
    }
  );
});


// DELETE /anime-list/:id
app.delete('/anime-list/:id', (req, res) => {
    if (!req.session.userId) return res.status(401).json({ message: 'Unauthorized' });
  
    const query = 'DELETE FROM anime_list WHERE id = ? AND user_id = ?';
    db.query(query, [req.params.id, req.session.userId], (err, result) => {
      if (err) return res.status(500).json({ message: 'Failed to delete anime' });
      res.json({ message: 'Anime deleted' });
    });
});


// GET /profile
app.get('/profile', (req, res) => {
  console.log("Session ID in profile: ", req.sessionID);

  if (!req.session.userId) return res.status(401).json({ message: 'Unauthorized' });

  const query = 'SELECT * FROM users WHERE id = ?';
  db.query(query, [req.session.userId], (err, results) => {
    if (err) return res.status(500).json({ message: 'Failed to fetch profile' });
    res.json(results[0]);
  });
});


// PUT /profile
app.put('/profile', (req, res) => {
  if (!req.session.userId) return res.status(401).json({ message: 'Unauthorized' });

  const { username, email } = req.body;
  const query = 'UPDATE users SET username = ?, email = ? WHERE id = ?';
  db.query(query, [username, email, req.session.userId], (err, result) => {
    if (err) return res.status(500).json({ message: 'Failed to update profile' });
    res.json({ message: 'Profile updated' });
  });
});


// DELETE /profile
app.delete('/profile', (req, res) => {
  if (!req.session.userId) return res.status(401).json({ message: 'Unauthorized' });

  const query = 'DELETE FROM users WHERE id = ?';
  db.query(query, [req.session.userId], (err, result) => {
    if (err) return res.status(500).json({ message: 'Failed to delete profile' });
    res.json({ message: 'Profile deleted' });
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));