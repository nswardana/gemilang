import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Typography,
  Fab,
  Card,
  CardContent,
  Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export const MemberListPage = () => {
  const { id } = useParams(); // group_id
  const [members, setMembers] = useState([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    istri: "",
    anak: "",
    tinggal: "",
    kerja: "",
    alasan: "",
    bantu_apa: "",
    rumusan: "",
  });
  const navigate = useNavigate();

  const loadMembers = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/groups/${id}/members`
      );
      const data = await res.json();
      setMembers(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadMembers();
  }, [id]);

  const handleOpen = (member = null) => {
    setEditing(member);
    setFormData(
      member || {
        name: "",
        istri: "",
        anak: "",
        tinggal: "",
        kerja: "",
        alasan: "",
        bantu_apa: "",
        rumusan: "",
      }
    );
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditing(null);
    setFormData({
      name: "",
      istri: "",
      anak: "",
      tinggal: "",
      kerja: "",
      alasan: "",
      bantu_apa: "",
      rumusan: "",
    });
  };

  const handleSave = async () => {
    const url = editing
      ? `${import.meta.env.VITE_API_URL}/api/members/${editing.id}`
      : `${import.meta.env.VITE_API_URL}/api/members/group/${id}`;
    const method = editing ? "PUT" : "POST";

    try {
      await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      handleClose();
      loadMembers();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (memberId) => {
    if (!confirm("Yakin ingin menghapus anggota ini?")) return;
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/api/members/${memberId}`, {
        method: "DELETE",
      });
      loadMembers();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, rgb(51, 98, 228) 0%, #ffffff 100%)",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          width: "100%",
          backgroundColor: "primary.light",
          py: 3,
          boxShadow: 1,
        }}
      >
        <Typography
          variant="h5"
          align="center"
          fontWeight="bold"
          gutterBottom
          color="primary.contrastText"
        >
          
        </Typography>
      </Box>

      {/* Back Button */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          maxWidth: 500,
          mx: "auto",
          px: 2,
          mt: 3,
          mb: 4,
        }}
      >
        <IconButton onClick={() => navigate(-1)} size="small">
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="subtitle1" sx={{ ml: 1 }}>
          Kembali
        </Typography>
      </Box>

      {/* Konten utama */}
      <Box sx={{ maxWidth: 500, mx: "auto", px: 2, pb: 10 }}>
        <Box sx={{ display: "grid", gap: 2 }}>
          {members.map((m) => (
            <Card
              key={m.id}
              sx={{
                background: "linear-gradient(135deg, #fdfdfd 0%, #e9f7ff 100%)",
                borderRadius: 3,
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                transition: "all 0.3s ease",
                cursor: "pointer",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 4px 14px rgba(0,0,0,0.12)",
                },
              }}
              onClick={() => navigate(`/member/${m.id}`)}
            >
              <CardContent
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  py: 1,
                }}
              >
                <Box>
                  <Typography variant="subtitle1" fontWeight={500}>
                    {m.name}
                  </Typography>
                  {m.kerja && (
                    <Typography variant="body2" color="text.secondary">
                      Kerja: {m.kerja}
                    </Typography>
                  )}
                  {m.tinggal && (
                    <Typography variant="body2" color="text.secondary">
                      Tinggal: {m.tinggal}
                    </Typography>
                  )}
                </Box>
                <Box sx={{ display: "flex", gap: 1 }} onClick={(e) => e.stopPropagation()}>
                  <IconButton
                    color="primary"
                    size="small"
                    sx={{
                      p: 0.5,
                      "& svg": { fontSize: 18 },
                      backgroundColor: "rgba(33, 150, 243, 0.1)",
                      "&:hover": { backgroundColor: "rgba(33, 150, 243, 0.2)" },
                    }}
                    onClick={() => handleOpen(m)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    size="small"
                    sx={{
                      p: 0.5,
                      "& svg": { fontSize: 18 },
                      backgroundColor: "rgba(244, 67, 54, 0.1)",
                      "&:hover": { backgroundColor: "rgba(244, 67, 54, 0.2)" },
                    }}
                    onClick={() => handleDelete(m.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>

      {/* Floating Add Button */}
      <Fab
        color="primary"
        aria-label="add"
        sx={{ position: "fixed", bottom: 24, right: 24, boxShadow: 3 }}
        onClick={() => handleOpen()}
      >
        <AddIcon />
      </Fab>

      {/* Dialog Add/Edit */}
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>{editing ? "Edit Anggota" : "Tambah Anggota"}</DialogTitle>
        <DialogContent>
          {Object.keys(formData).filter((key) => key !== "id" && key !== "group_id").map((key) => (
            <TextField
              key={key}
              label={key.replace("_", " ").toUpperCase()}
              value={formData[key]}
              onChange={(e) =>
                setFormData({ ...formData, [key]: e.target.value })
              }
              fullWidth
              margin="dense"
              multiline={key === "rumusan" || key === "alasan" || key === "bantu_apa"} // <- both multiline
              rows={key === "rumusan" || key === "alasan" || key === "bantu_apa" ? 5 : 1} // optional: give a default 3 rows
              />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Batal</Button>
          <Button variant="contained" onClick={handleSave}>
            Simpan
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
