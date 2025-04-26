const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const authRoutes = require("./routers/auth");
const todoRoutes = require("./routers/todo");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public/page")));

// Kết nối MongoDB
mongoose
  .connect("mongodb://localhost:27017/todo-app-list")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB error:", err));

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

mongoose.connection.once("open", () => {
  console.log("✅ Đã kết nối MongoDB với DB:", mongoose.connection.name);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);
