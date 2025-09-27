const express = require('express');
const router = express.Router();
const { Pool } = require('pg');
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

router.post('/', async (req, res) => {
  try {
    const { nom } = req.body;
    const result = await pool.query(
      "INSERT INTO type_lieu (nom) VALUES ($1) RETURNING *",
      [nom]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM type_lieu ORDER BY idtype_lieu ASC");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { nom } = req.body;
    const result = await pool.query(
      "UPDATE type_lieu SET nom=$1 WHERE idtype_lieu=$2 RETURNING *",
      [nom, req.params.id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await pool.query("DELETE FROM type_lieu WHERE idtype_lieu=$1", [req.params.id]);
    res.json({ message: "Type_lieu supprimé ✅" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
