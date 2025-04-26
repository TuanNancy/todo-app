document.addEventListener("DOMContentLoaded", () => {
  const path = window.location.pathname;

  // Kiểm tra nếu đang ở index.html mà không có token thì redirect về login
  if (
    (path.includes("index.html") || path === "/" || path === "/index") &&
    !localStorage.getItem("token")
  ) {
    window.location.href = "login.html";
    return;
  }

  if (path.includes("register.html")) initRegister();
  else if (path.includes("login.html")) initLogin();
  else if (path.includes("index.html") || path === "/" || path === "/index")
    initTodo();
});

function initRegister() {
  document
    .getElementById("register-form")
    .addEventListener("submit", async (e) => {
      e.preventDefault();
      const username = document.getElementById("username").value.trim();
      const password = document.getElementById("password").value.trim();
      const confirm = document.getElementById("confirm-password").value.trim();

      if (password !== confirm) return alert("Mật khẩu không khớp");

      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Đăng ký thành công");
        window.location.href = "login.html";
      } else {
        alert(data.message || "Lỗi đăng ký");
      }
    });
}

// dang ki
function initRegister() {
  document
    .getElementById("register-form")
    .addEventListener("submit", async (e) => {
      e.preventDefault();
      const username = document.getElementById("username").value.trim();
      const password = document.getElementById("password").value.trim();
      const confirm = document.getElementById("confirm-password").value.trim();

      if (password !== confirm) return alert("Mật khẩu không khớp");

      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Đăng ký thành công");
        window.location.href = "login.html";
      } else {
        alert(data.message || "Lỗi đăng ký");
      }
    });
}

// dang nhap
function initLogin() {
  document
    .getElementById("login-form")
    .addEventListener("submit", async (e) => {
      e.preventDefault();
      const username = document.getElementById("username").value.trim();
      const password = document.getElementById("password").value.trim();

      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.token);
        window.location.href = "index.html";
      } else {
        alert(data.message || "Sai tài khoản hoặc mật khẩu");
      }
    });
}

function logout() {
  localStorage.removeItem("token");
  window.location.href = "login.html";
}

// Xử lý Todo chính

let todos = [];

function initTodo() {
  fetchTodos();

  document.getElementById("todo-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const title = document.getElementById("todo-input").value;
    const dueDate = document.getElementById("due-date").value;
    const category = document.getElementById("category").value;

    const res = await fetch("/api/todos", {
      method: "POST",
      headers: authHeader(),
      body: JSON.stringify({ title, dueDate, category }),
    });

    const data = await res.json();
    if (res.ok) {
      todos.unshift(data);
      renderTodos();
      e.target.reset();
    } else {
      alert(data.message || "Lỗi thêm công việc");
    }
  });
}

async function fetchTodos() {
  const res = await fetch("/api/todos", { headers: authHeader() });
  const data = await res.json();
  todos = data;
  renderTodos();
}

// Hiển thị danh sách
function renderTodos(filter = "all") {
  const list = document.getElementById("todo-list");
  list.innerHTML = "";

  let show = todos;
  if (filter === "completed") show = todos.filter((t) => t.completed);
  if (filter === "notCompleted") show = todos.filter((t) => !t.completed);

  show.forEach((todo) => {
    const li = document.createElement("li");
    li.className = `todo-item ${todo.completed ? "completed" : ""}`;
    li.innerHTML = `
        <span>${todo.title} (${todo.category || "Không phân loại"})</span>
        <div>
          <button onclick="toggleTodo('${todo._id}')">${
      todo.completed ? "Chưa hoàn thành" : "Hoàn thành"
    }</button>
          <button onclick="editTodo('${todo._id}')">Sửa</button>
          <button onclick="deleteTodo('${todo._id}')">Xóa</button>
        </div>
      `;
    list.appendChild(li);
  });
}

async function toggleTodo(id) {
  await fetch(`/api/todos/${id}/toggle`, {
    method: "PATCH",
    headers: authHeader(),
  });
  todos = todos.map((t) =>
    t._id === id ? { ...t, completed: !t.completed } : t
  );
  renderTodos();
}

async function deleteTodo(id) {
  if (confirm("Bạn có chắc muốn xóa không?")) {
    await fetch(`/api/todos/${id}`, {
      method: "DELETE",
      headers: authHeader(),
    });
    todos = todos.filter((t) => t._id !== id);
    renderTodos();
  }
}

async function editTodo(id) {
  const newTitle = prompt("Nội dung mới:");
  if (newTitle) {
    const res = await fetch(`/api/todos/${id}`, {
      method: "PUT",
      headers: authHeader(),
      body: JSON.stringify({ title: newTitle }),
    });
    const data = await res.json();
    todos = todos.map((t) => (t._id === id ? data : t));
    renderTodos();
  }
}

function authHeader() {
  return {
    "Content-Type": "application/json",
    Authorization: "Bearer " + localStorage.getItem("token"),
  };
}
