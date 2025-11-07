import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { initDB } from "./db/index.js";
import categoriesRoutes from "./routes/categories.js";
import groupsRoutes from "./routes/groups.js";
import membersRoutes from "./routes/members.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/categories", categoriesRoutes);
app.use("/api/groups", groupsRoutes);
app.use("/api/members", membersRoutes);

const PORT = process.env.PORT || 5000;

initDB().then(() => {
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
}).catch(err => {
  console.error("Failed to initialize DB:", err);
});
