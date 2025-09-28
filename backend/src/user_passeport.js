// src/user_passport.js
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const pool = require("./db");

// Create a new passport instance for users
const userPassport = new passport.Passport();

userPassport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password'
    },
    async (email, password, done) => {
      try {
        const result = await pool.query("SELECT * FROM candidat WHERE email = $1", [email]);
        if (result.rows.length === 0) {
          return done(null, false, { message: "Utilisateur introuvable" });
        }

        const user = result.rows[0];
        const valid = await bcrypt.compare(password, user.mdp);
        if (!valid) {
          return done(null, false, { message: "Mot de passe incorrect" });
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

userPassport.serializeUser((user, done) => {
  done(null, user.idcandidat);
});

userPassport.deserializeUser(async (id, done) => {
  try {
    const result = await pool.query("SELECT * FROM candidat WHERE idcandidat = $1", [id]);
    if (result.rows.length === 0) {
      return done(null, false);
    }
    return done(null, result.rows[0]);
  } catch (err) {
    return done(err);
  }
});

module.exports = userPassport;
