import express from "express";
import { GroupName, Member } from "../db/index.js";

const router = express.Router();

/* ==========================================
   GET /api/groups/:id
   Ambil detail satu group berdasarkan ID
========================================== */
router.get("/:id", async (req, res) => {
  try {
    const group = await GroupName.findByPk(req.params.id);
    if (!group) return res.status(404).json({ message: "Group tidak ditemukan" });
    res.json(group);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ==========================================
   GET /api/categories/:id/groups
   (Sudah ada di routes/categories.js)
========================================== */

/* ==========================================
   GET /api/groups/:id/members
   Ambil semua member berdasarkan group ID
========================================== */
router.get("/:id/members", async (req, res) => {
  try {
    const members = await Member.findAll({ where: { group_id: req.params.id } });
    res.json(members);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ==========================================
   POST /api/categories/:categoryId/groups
   Tambah group baru dalam kategori tertentu
========================================== */
router.post("/category/:categoryId", async (req, res) => {
  try {
    const { name } = req.body;
    const { categoryId } = req.params;

    if (!name) return res.status(400).json({ message: "Nama group wajib diisi" });

    const newGroup = await GroupName.create({
      name,
      category_id: categoryId,
    });

    res.status(201).json(newGroup);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ==========================================
   PUT /api/groups/:id
   Update nama group
========================================== */
router.post("/:id", async (req, res) => {
  try {
    const { name } = req.body;
    const group = await GroupName.findByPk(req.params.id);
    if (!group) return res.status(404).json({ message: "Group tidak ditemukan" });

    group.name = name;
    await group.save();

    res.json({ message: "Group berhasil diperbarui", data: group });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ==========================================
   DELETE /api/groups/:id
   Hapus group dan member terkait
========================================== */
router.get("/:id/delete", async (req, res) => {
  try {
    const group = await GroupName.findByPk(req.params.id);
    if (!group) return res.status(404).json({ message: "Group tidak ditemukan" });

    // Hapus semua member dalam group ini
    await Member.destroy({ where: { group_id: req.params.id } });

    // Hapus group
    await group.destroy();

    res.json({ message: "Group dan member terkait berhasil dihapus" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ==========================================
   POST /api/groups/:categoryId/groups
   Tambah group baru dalam kategori tertentu
========================================== */
router.post("/:categoryId/groups", async (req, res) => {
  try {
    const { name } = req.body;
    const { categoryId } = req.params;

    if (!name) return res.status(400).json({ message: "Nama group wajib diisi" });

    const newGroup = await GroupName.create({
      name,
      category_id: categoryId,
    });

    res.status(201).json({
      message: "Group berhasil dibuat",
      data: newGroup,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
