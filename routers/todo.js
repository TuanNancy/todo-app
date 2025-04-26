const express = require("express");
const router = express.Router();
const {
  getTodos,
  createTodo,
  toggleTodo,
  updateTodo,
  deleteTodo,
} = require("../controllers/todoController");

const auth = require("../middleware/authMiddleware");

// Bảo vệ toàn bộ route
router.use(auth);

router.get("/", getTodos);
router.post("/", createTodo);
router.patch("/:id/toggle", toggleTodo);
router.put("/:id", updateTodo);
router.delete("/:id", deleteTodo);

module.exports = router;
