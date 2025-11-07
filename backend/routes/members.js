import express from "express";
import { Member, GroupName } from "../db/index.js";

const router = express.Router();

/* ==========================================
   GET /api/members
   Ambil semua member (opsional)
========================================== */
router.get("/", async (req, res) => {
  try {
    const members = await Member.findAll();
    res.json(members);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ==========================================
   GET /api/members/:id
   Ambil detail satu member
========================================== */
router.get("/:id", async (req, res) => {
  try {
    const member = await Member.findByPk(req.params.id);
    if (!member)
      return res.status(404).json({ message: "Member tidak ditemukan" });
    res.json(member);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ==========================================
   POST /api/groups/:groupId/members
   Tambah member baru ke group tertentu
========================================== */
router.post("/group/:groupId", async (req, res) => {
  try {
    const { groupId } = req.params;
    const {
      name,
      position,
      phone,
      email,
      isteri,
      anak,
      tinggal,
      kerja,
      perjuangan,
      istri,
      alasan,
      bantu_apa,
      rumusan,
    } = req.body;

    // Validasi group
    const group = await GroupName.findByPk(groupId);
    if (!group)
      return res.status(404).json({ message: "Group tidak ditemukan" });

    // Validasi field wajib
    if (!name) return res.status(400).json({ message: "Nama member wajib diisi" });

    const newMember = await Member.create({
      name,
      position: position || null,
      phone: phone || null,
      email: email || null,
      isteri: isteri || null,
      anak: anak || null,
      tinggal: tinggal || null,
      kerja: kerja || null,
      perjuangan: perjuangan || null,
      istri: istri || null,
      alasan: alasan || null,
      bantu_apa: bantu_apa || null,
      rumusan: rumusan || null,
      group_id: groupId,
    });

    res.status(201).json({
      message: "Member berhasil ditambahkan",
      data: newMember,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ==========================================
   PUT /api/members/:id
   Update member berdasarkan ID
========================================== */
router.put("/:id", async (req, res) => {
  try {
    const member = await Member.findByPk(req.params.id);
    if (!member)
      return res.status(404).json({ message: "Member tidak ditemukan" });

    const {
      name,
      position,
      phone,
      email,
      isteri,
      anak,
      tinggal,
      kerja,
      perjuangan,
      istri,
      alasan,
      bantu_apa,
      rumusan,
    } = req.body;

    await member.update({
      name: name || member.name,
      position: position || member.position,
      phone: phone || member.phone,
      email: email || member.email,
      isteri: isteri || member.isteri,
      anak: anak || member.anak,
      tinggal: tinggal || member.tinggal,
      kerja: kerja || member.kerja,
      perjuangan: perjuangan || member.perjuangan,
      istri: istri || member.istri,
      alasan: alasan || member.alasan,
      bantu_apa: bantu_apa || member.bantu_apa,
      rumusan: rumusan || member.rumusan,
    });

    res.json({
      message: "Member berhasil diperbarui",
      data: member,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ==========================================
   DELETE /api/members/:id
   Hapus member berdasarkan ID
========================================== */
router.delete("/:id", async (req, res) => {
  try {
    const member = await Member.findByPk(req.params.id);
    if (!member)
      return res.status(404).json({ message: "Member tidak ditemukan" });

    await member.destroy();
    res.json({ message: "Member berhasil dihapus" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
