// src/db.js
const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "jobmatch",
  password: "root",
  port: 5432,
});

module.exports = pool;
