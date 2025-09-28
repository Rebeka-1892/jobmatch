const express = require('express');
const session = require("express-session");
const cors = require('cors');
const user_passport = require("./src/user_passeport");
const enterprise_passport = require("./src/enterprise_passeport");
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Session
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // Set to true if using HTTPS
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// Initialize passport middleware
app.use(user_passport.initialize());
app.use(user_passport.session());
app.use(enterprise_passport.initialize());
app.use(enterprise_passport.session());

// Routes
app.use('/type_lieux', require('./routes/type_lieuRoutes'));
app.use('/auth', require('./routes/auth'));

// Health check route
app.get('/', (req, res) => {
  res.json({ 
    message: 'JobMatch Backend API is running',
    version: '1.0.0',
    authentication: 'JWT-based'
  });
});


app.listen(PORT, () => console.log(`Serveur sur http://localhost:${PORT}`));
