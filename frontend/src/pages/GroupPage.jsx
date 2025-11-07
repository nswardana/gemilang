import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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

export const GroupPage = () => {
  const { id } = useParams();
  const [groups, setGroups] = useState([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [formName, setFormName] = useState("");
  const navigate = useNavigate();

  const loadGroups = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/categories/${id}/groups`
      );
      const data = await res.json();
      setGroups(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadGroups();
  }, [id]);

  const handleOpen = (group = null) => {
    setEditing(group);
    setFormName(group ? group.name : "");
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditing(null);
    setFormName("");
  };

  const handleSave = async () => {
    const url = editing
      ? `${import.meta.env.VITE_API_URL}/api/groups/${editing.id}`
      : `${import.meta.env.VITE_API_URL}/api/groups/${id}/groups`;

    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: formName }),
    });

    handleClose();
    loadGroups();
  };

  const handleDelete = async (groupId) => {
    if (!confirm("Yakin ingin menghapus group ini?")) return;
    await fetch(`${import.meta.env.VITE_API_URL}/api/groups/${groupId}/delete`, {
      method: "GET",
    });
    loadGroups();
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
          backgroundColor: "primary.light",
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
           Group
        </Typography>
      </Box>

      {/* Back Button */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mb: 3,
          maxWidth: 500,
          mx: "auto",
          px: 2,
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
          {groups.map((group) => (
            <Card
              key={group.id}
              onClick={() => navigate(`/group/${group.id}/members`)}
              sx={{
                background: "linear-gradient(135deg, #fdfdfd 0%, #f1f5ff 100%)",
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
                  {group.name}
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
                      handleOpen(group);
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
                      handleDelete(group.id);
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

      {/* Floating Add Button */}
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
        <DialogTitle>{editing ? "Edit Group" : "Tambah Group"}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            label="Nama Group"
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
