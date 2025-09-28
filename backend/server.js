const express = require("express");
const session = require("express-session");
const typeLieuRoutes = require("./routes/typeLieuRoutes");
const annonceRoutes = require("./routes/annonceRoutes");
const candidatRoutes = require("./routes/candidatRoutes");
const competenceRoutes = require("./routes/competenceRoutes");
const competenceCandidatRoutes = require("./routes/competenceCandidatRoutes");
const detailAnnonceRoutes = require("./routes/detailAnnonceRoutes");
const entrepriseRoutes = require("./routes/entrepriseRoutes");
const experienceRoutes = require("./routes/experienceRoutes");
const ignoreRoutes = require("./routes/ignoreRoutes");
const matchRoutes = require("./routes/matchRoutes");
const niveauEtudeRoutes = require("./routes/niveauEtudeRoutes");
const niveauEtudeAnnonceRoutes = require("./routes/niveauEtudeAnnonceRoutes");
const parcoursRoutes = require("./routes/parcoursRoutes");
const preferenceRoutes = require("./routes/preferenceRoutes");
const typeEmploiRoutes = require("./routes/typeEmploiRoutes");
const user_passport = require("./src/user_passeport");
const enterprise_passport = require("./src/enterprise_passeport");

const app = express();
app.use(express.json());

// Routes
app.use("/type-lieu", typeLieuRoutes);
app.use("/annonce", annonceRoutes);
app.use("/candidat", candidatRoutes);
app.use("/competence", competenceRoutes);
app.use("/competence-candidat", competenceCandidatRoutes);
app.use("/detail-annonce", detailAnnonceRoutes);
app.use("/entreprise", entrepriseRoutes);
app.use("/experience", experienceRoutes);
app.use("/ignore", ignoreRoutes);
app.use("/match", matchRoutes);
app.use("/niveau-etude", niveauEtudeRoutes);
app.use("/niveau-etude-annonce", niveauEtudeAnnonceRoutes);
app.use("/parcours", parcoursRoutes);
app.use("/preference", preferenceRoutes);
app.use("/type-emploi", typeEmploiRoutes);

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

app.use('/auth', require('./routes/auth'));

// Lancer serveur
app.listen(5000, () => {
  console.log("🚀 Serveur démarré sur http://localhost:5000");
});
