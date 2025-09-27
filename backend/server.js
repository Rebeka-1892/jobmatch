const express = require("express");
const typeLieuRoutes = require("./routes/typeLieuRoutes");

const app = express();
app.use(express.json());

// Routes
app.use("/type-lieu", typeLieuRoutes);

// Lancer serveur
app.listen(5000, () => {
  console.log("🚀 Serveur démarré sur http://localhost:5000");
});
