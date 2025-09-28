const express = require("express");
const router = express.Router();
const prisma = require("../prismaClient");

router.get("/", async (req, res) => {
  try {
    const items = await prisma.match.findMany();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const item = await prisma.match.findUnique({ where: { idmatch: parseInt(req.params.id) } });
    if (!item) return res.status(404).json({ message: "Non trouvé" });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const item = await prisma.match.create({ data: req.body });
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const item = await prisma.match.update({ where: { idmatch: parseInt(req.params.id) }, data: req.body });
    res.json(item);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await prisma.match.delete({ where: { idmatch: parseInt(req.params.id) } });
    res.json({ message: "Supprimé ✅" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
