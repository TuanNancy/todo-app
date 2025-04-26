const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { username, password } = req.body;

  // Kiểm tra đầu vào
  if (!username || !password) {
    return res.status(400).json({ message: "Vui lòng nhập đầy đủ thông tin" });
  }

  // Kiểm tra tồn tại username
  const existUser = await User.findOne({ username });
  if (existUser) {
    return res.status(400).json({ message: "Tên đăng nhập đã tồn tại" });
  }

  // Mã hóa mật khẩu
  const hashedPassword = await bcrypt.hash(password, 10);

  // Tạo user
  const newUser = new User({ username, password: hashedPassword });
  await newUser.save();

  res.status(201).json({ message: "Đăng ký thành công" });
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  // Tìm user
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(404).json({ message: "Người dùng không tồn tại" });
  }

  // So sánh mật khẩu
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Sai mật khẩu" });
  }

  // Tạo token
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "secret", {
    expiresIn: "1d",
  });

  res.json({ token });
};
