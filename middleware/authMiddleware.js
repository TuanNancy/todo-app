const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Bạn chưa đăng nhập" });
  }

  try {
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret");
    req.user = decoded; // req.user.id = user._id
    next();
  } catch (err) {
    res.status(403).json({ message: "Token không hợp lệ hoặc hết hạn" });
  }
};
