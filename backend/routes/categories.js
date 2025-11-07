import express from "express";
import { Category, GroupName } from "../db/index.js";

const router = express.Router();

/* ==========================================
   GET /api/categories
   Ambil semua kategori
========================================== */
router.get("/", async (req, res) => {
  try {
    const data = await Category.findAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ==========================================
   GET /api/categories/:id/groups
   Ambil semua group berdasarkan kategori
========================================== */
router.get("/:id/groups", async (req, res) => {
  try {
    const groups = await GroupName.findAll({
      where: { category_id: req.params.id },
    });
    res.json(groups);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ==========================================
   POST /api/categories
   Tambah kategori baru
========================================== */
router.post("/", async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: "Nama kategori wajib diisi" });

    const newCat = await Category.create({ name });
    res.status(201).json(newCat);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ==========================================
   post /api/categories/:id
   Update kategori
========================================== */
router.post("/:id", async (req, res) => {
  console.log("post /api/categories/:id");
  try {
    const { name } = req.body;
    const category = await Category.findByPk(req.params.id);
    if (!category) return res.status(404).json({ message: "Kategori tidak ditemukan" });

    category.name = name;
    await category.save();

    res.json({ message: "Kategori berhasil diperbarui", data: category });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ==========================================
   get /api/categories/:id
   Hapus kategori dan group terkait
========================================== */
router.get("/:id", async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) return res.status(404).json({ message: "Kategori tidak ditemukan" });

    // Hapus semua group yang terkait dengan kategori ini (opsional)
    await GroupName.destroy({ where: { category_id: req.params.id } });

    await category.destroy();
    res.json({ message: "Kategori dan grup terkait berhasil dihapus" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
