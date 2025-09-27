const express = require("express");
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

// Lancer serveur
app.listen(5000, () => {
  console.log("🚀 Serveur démarré sur http://localhost:5000");
});
