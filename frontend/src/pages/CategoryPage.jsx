import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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

export const CategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [formName, setFormName] = useState("");
  const navigate = useNavigate();

  // ✅ Load categories
  const loadCategories = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/categories`);
      const data = await res.json();
      setCategories(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  // ✅ Open dialog for new / edit
  const handleOpen = (cat = null) => {
    setEditing(cat);
    setFormName(cat ? cat.name : "");
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditing(null);
    setFormName("");
  };

  // ✅ Save category (add or update)
  const handleSave = async () => {
    const method = editing ? "POST" : "POST";
    const url = editing
      ? `${import.meta.env.VITE_API_URL}/api/categories/${editing.id}`
      : `${import.meta.env.VITE_API_URL}/api/categories`;

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: formName }),
    });

    handleClose();
    loadCategories();
  };

  // ✅ Delete category
  const handleDelete = async (id) => {
    if (!confirm("Yakin ingin menghapus kategori ini?")) return;
    await fetch(`${import.meta.env.VITE_API_URL}/api/categories/${id}`, {
      method: "GET",
    });
    loadCategories();
  };
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(180deg,rgb(51, 98, 228) 0%, #ffffff 100%)",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          width: "100%",
          backgroundColor: "primary.light", // bisa diganti sesuai tema
          py: 3,
          mb: 4,
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
          Kategori
        </Typography>
      </Box>
  
      {/* Konten utama */}
      <Box
        sx={{
          maxWidth: 500,
          mx: "auto",
          px: 2,
          pb: 10,
        }}
      >
        {/* Daftar kategori */}
        <Box sx={{ display: "grid", gap: 2, mt: 3 }}>
          {categories.map((cat) => (
            <Card
              key={cat.id}
              onClick={() => navigate(`/category/${cat.id}/groups`)}
              sx={{
                background: "linear-gradient(135deg, #f9fafb 0%, #eef2ff 100%)",
                borderRadius: 3,
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                transition: "all 0.3s ease",
                cursor: "pointer",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 4px 14px rgba(0,0,0,0.12)",
                },
              }}
            >
              <CardContent
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  py: 1,
                }}
              >
                <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                  {cat.name}
                </Typography>
  
                <Box sx={{ display: "flex", gap: 1 }}>
                  <IconButton
                    color="primary"
                    size="small"
                    sx={{
                      p: 0.5,
                      "& svg": { fontSize: 18 },
                      backgroundColor: "rgba(33, 150, 243, 0.1)",
                      "&:hover": {
                        backgroundColor: "rgba(33, 150, 243, 0.2)",
                      },
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpen(cat);
                    }}
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
                      "&:hover": {
                        backgroundColor: "rgba(244, 67, 54, 0.2)",
                      },
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(cat.id);
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>
  
      {/* Floating Button */}
      <Fab
        color="primary"
        aria-label="add"
        sx={{
          position: "fixed",
          bottom: 24,
          right: 24,
          boxShadow: 3,
        }}
        onClick={() => handleOpen()}
      >
        <AddIcon />
      </Fab>
  
      {/* Dialog Add/Edit */}
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>{editing ? "Edit Kategori" : "Tambah Kategori"}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            label="Nama Kategori"
            value={formName}
            onChange={(e) => setFormName(e.target.value)}
            fullWidth
            margin="dense"
          />
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
