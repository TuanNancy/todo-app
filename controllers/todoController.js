const Todo = require("../models/Todo");

// Lấy danh sách công việc của người dùng hiện tại
exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.user.id }).sort({
      createdAt: -1,
    });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: "Không thể lấy danh sách công việc" });
  }
};

// Tạo công việc mới
exports.createTodo = async (req, res) => {
  try {
    const { title, dueDate, category } = req.body;
    if (!title) return res.status(400).json({ message: "Tiêu đề là bắt buộc" });

    const todo = new Todo({
      userId: req.user.id,
      title,
      dueDate: dueDate ? new Date(dueDate) : null,
      category,
      completed: false,
      createdAt: new Date(),
    });

    await todo.save();
    res.status(201).json(todo);
  } catch (err) {
    res.status(500).json({ message: "Không thể tạo công việc" });
  }
};

// Đổi trạng thái hoàn thành
exports.toggleTodo = async (req, res) => {
  try {
    const todo = await Todo.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });
    if (!todo)
      return res.status(404).json({ message: "Không tìm thấy công việc" });

    todo.completed = !todo.completed;
    await todo.save();
    res.json(todo);
  } catch (err) {
    res.status(500).json({ message: "Không thể cập nhật trạng thái" });
  }
};

// Cập nhật nội dung công việc
exports.updateTodo = async (req, res) => {
  try {
    const { title } = req.body;
    const todo = await Todo.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { title },
      { new: true }
    );
    res.json(todo);
  } catch (err) {
    res.status(500).json({ message: "Không thể cập nhật công việc" });
  }
};

// Xóa công việc
exports.deleteTodo = async (req, res) => {
  try {
    await Todo.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    res.json({ message: "Đã xóa công việc" });
  } catch (err) {
    res.status(500).json({ message: "Không thể xóa công việc" });
  }
};
