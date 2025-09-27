const express = require("express");
const router = express.Router();
const prisma = require("../prismaClient");

// Récupérer tous
router.get("/", async (req, res) => {
  try {
    const items = await prisma.type_lieu.findMany();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Lire un seul
router.get("/:id", async (req, res) => {
  try {
    const item = await prisma.type_lieu.findUnique({
      where: { idtype_lieu: parseInt(req.params.id) }
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
    const item = await prisma.type_lieu.create({
      data: { nom: req.body.nom }
    });
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Mettre à jour
router.put("/:id", async (req, res) => {
  try {
    const item = await prisma.type_lieu.update({
      where: { idtype_lieu: parseInt(req.params.id) },
      data: { nom: req.body.nom }
    });
    res.json(item);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Supprimer
router.delete("/:id", async (req, res) => {
  try {
    await prisma.type_lieu.delete({
      where: { idtype_lieu: parseInt(req.params.id) }
    });
    res.json({ message: "Supprimé ✅" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
