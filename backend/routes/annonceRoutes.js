const express = require("express");
const router = express.Router();
const prisma = require("../prismaClient");

// Récupérer tous
router.get("/", async (req, res) => {
  try {
    const items = await prisma.annonce.findMany();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Lire un seul
router.get("/:id", async (req, res) => {
  try {
    const item = await prisma.annonce.findUnique({
      where: { idannonce: parseInt(req.params.id) }
    });
    if (!item) return res.status(404).json({ message: "Non trouvé" });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Créer
router.post("/", async (req, res) => {
  try {
    const item = await prisma.annonce.create({ data: req.body });
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Mettre à jour
router.put("/:id", async (req, res) => {
  try {
    const item = await prisma.annonce.update({
      where: { idannonce: parseInt(req.params.id) },
      data: req.body
    });
    res.json(item);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Supprimer
router.delete("/:id", async (req, res) => {
  try {
    await prisma.annonce.delete({ where: { idannonce: parseInt(req.params.id) } });
    res.json({ message: "Supprimé ✅" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
