import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  CardContent,
  IconButton,
  Divider,
  CircularProgress,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import VisibilityIcon from "@mui/icons-material/Visibility";

export const MemberDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogField, setDialogField] = useState(""); // "Alasan", "Bantu Apa", "Rumusan"
  const [dialogContent, setDialogContent] = useState("");

  const loadMember = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/members/${id}`);
      const data = await res.json();
      setMember(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMember();
  }, [id]);

  const handleOpenDialog = (field, content) => {
    setDialogField(field);
    setDialogContent(content || "-");
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setDialogField("");
    setDialogContent("");
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!member) {
    return (
      <Typography align="center" mt={10} color="text.secondary">
        Data anggota tidak ditemukan.
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        maxWidth: 480,
        mx: "auto",
        px: 2,
        pb: 8,
        minHeight: "100vh",
        background: "linear-gradient(180deg, rgb(51, 98, 228) 0%, #ffffff 100%)",
      }}
    >
      {/* Tombol kembali */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <IconButton onClick={() => navigate(-1)} size="small">
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="subtitle1" sx={{ ml: 1 }}>
          Kembali
        </Typography>
      </Box>

      {/* Card info member */}
      <Card
        sx={{
          background: "linear-gradient(135deg, #fdfdfd 0%, #e9f7ff 100%)",
          borderRadius: 3,
          boxShadow: "0 3px 10px rgba(0,0,0,0.08)",
          p: 2,
        }}
      >
        <CardContent>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            {member.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {member.position || "-"}
          </Typography>

          <Divider sx={{ my: 1.5 }} />

          <DetailItem label="Isteri" value={member.istri} />
          <DetailItem label="Anak" value={member.anak} />
          <DetailItem label="Tinggal" value={member.tinggal} />
          <DetailItem label="Kerja" value={member.kerja} />
          
          {/* Icon untuk membuka dialog */}
          <DetailItem
            label="Alasan"
            icon={<VisibilityIcon fontSize="small" />}
            onClick={() => handleOpenDialog("Alasan", member.alasan)}
          />
          <DetailItem
            label="Bantu Apa"
            icon={<VisibilityIcon fontSize="small" />}
            onClick={() => handleOpenDialog("Bantu Apa", member.bantu_apa)}
          />
          <DetailItem
            label="Rumusan"
            icon={<VisibilityIcon fontSize="small" />}
            onClick={() => handleOpenDialog("Rumusan", member.rumusan)}
          />
        </CardContent>
      </Card>

      {/* Tombol kembali di bawah */}
      <Button
        fullWidth
        variant="contained"
        color="primary"
        sx={{ mt: 3, borderRadius: 2 }}
        onClick={() => navigate(-1)}
      >
        ⬅️ Kembali ke Daftar
      </Button>

      {/* Dialog untuk Alasan / Rumusan */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog} fullWidth>
        <DialogTitle>{dialogField}</DialogTitle>
        <DialogContent>
          <Typography variant="body2" whiteSpace="pre-line">
            {dialogContent}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Tutup</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

/* Komponen kecil agar rapi */
const DetailItem = ({ label, value, onClick, icon }) => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      my: 0.5,
      p: 1,
      cursor: onClick ? "pointer" : "default",
    }}
    onClick={onClick}
  >
    <Typography variant="body2" color="text.secondary">
      {label}
    </Typography>
    {icon ? icon : <Typography variant="body2" fontWeight={500}>{value || "-"}</Typography>}
  </Box>
);
