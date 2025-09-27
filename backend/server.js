const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connexion PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

pool.connect()
  .then(() => console.log("PostgreSQL connecté ✅"))
  .catch(err => console.error("Erreur de connexion", err));

// Routes CRUD
app.use('/type_lieux', require('./routes/type_lieuRoutes'));

app.listen(PORT, () => console.log(`Serveur sur http://localhost:${PORT}`));
