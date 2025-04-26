const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  completed: { type: Boolean, default: false },
  dueDate: { type: Date, default: null },
  category: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Todo", todoSchema);
