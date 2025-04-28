const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

// Debug: In ra giá trị của biến môi trường
console.log("MONGODB_URI:", process.env.MONGODB_URI);

const authRoutes = require("./routers/auth");
const todoRoutes = require("./routers/todo");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public/page")));

// Kết nối MongoDB Atlas
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ Lỗi kết nối MongoDB Atlas:", err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes);

app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Internal server error" });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);
