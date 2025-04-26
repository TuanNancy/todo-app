# Todo App

Ứng dụng quản lý công việc (Todo) được xây dựng với Node.js, Express và MongoDB.

## Tính năng

- Đăng ký và đăng nhập người dùng
- Tạo, đọc, cập nhật và xóa công việc
- Đánh dấu công việc đã hoàn thành
- Phân loại công việc theo danh mục
- Đặt hạn hoàn thành cho công việc

## Yêu cầu hệ thống

- Node.js (v14 trở lên)
- MongoDB (v4.4 trở lên)
- npm hoặc yarn

## Cài đặt

1. Clone repository:

```bash
git clone https://github.com/VNATdev-ops/todo-app.git
cd todo-app
```

2. Cài đặt dependencies:

```bash
npm install
```

3. Tạo file .env:

```env
JWT_SECRET=your_secret_key
MONGODB_URI=mongodb://localhost:27017/todo-app-list
PORT=3000
```

4. Khởi động server:

```bash
npm start
```

## Cấu trúc dự án

```
todo-app/
├── config/             # Cấu hình ứng dụng
├── controllers/        # Xử lý logic
├── middleware/         # Middleware
├── models/            # Schema MongoDB
├── public/            # Static files
├── routers/           # API routes
├── views/             # Templates
├── .env              # Environment variables
├── package.json      # Dependencies
└── server.js         # Entry point
```

## API Documentation

### Authentication

#### Đăng ký

- **URL**: `/api/auth/register`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "username": "string",
    "password": "string"
  }
  ```
- **Response**:
  ```json
  {
    "message": "Đăng ký thành công"
  }
  ```

#### Đăng nhập

- **URL**: `/api/auth/login`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "username": "string",
    "password": "string"
  }
  ```
- **Response**:
  ```json
  {
    "token": "string"
  }
  ```

### Todos

#### Lấy danh sách todos

- **URL**: `/api/todos`
- **Method**: `GET`
- **Headers**: `Authorization: Bearer <token>`
- **Response**:
  ```json
  [
    {
      "_id": "string",
      "title": "string",
      "completed": boolean,
      "dueDate": "date",
      "category": "string",
      "createdAt": "date"
    }
  ]
  ```

#### Tạo todo mới

- **URL**: `/api/todos`
- **Method**: `POST`
- **Headers**: `Authorization: Bearer <token>`
- **Body**:
  ```json
  {
    "title": "string",
    "dueDate": "date",
    "category": "string"
  }
  ```
- **Response**:
  ```json
  {
    "_id": "string",
    "title": "string",
    "completed": false,
    "dueDate": "date",
    "category": "string",
    "createdAt": "date"
  }
  ```

#### Toggle trạng thái todo

- **URL**: `/api/todos/:id/toggle`
- **Method**: `PATCH`
- **Headers**: `Authorization: Bearer <token>`
- **Response**:
  ```json
  {
    "_id": "string",
    "title": "string",
    "completed": boolean,
    "dueDate": "date",
    "category": "string",
    "createdAt": "date"
  }
  ```

#### Cập nhật todo

- **URL**: `/api/todos/:id`
- **Method**: `PUT`
- **Headers**: `Authorization: Bearer <token>`
- **Body**:
  ```json
  {
    "title": "string"
  }
  ```
- **Response**:
  ```json
  {
    "_id": "string",
    "title": "string",
    "completed": boolean,
    "dueDate": "date",
    "category": "string",
    "createdAt": "date"
  }
  ```

#### Xóa todo

- **URL**: `/api/todos/:id`
- **Method**: `DELETE`
- **Headers**: `Authorization: Bearer <token>`
- **Response**:
  ```json
  {
    "message": "Đã xóa công việc"
  }
  ```

## Bảo mật

- JWT Authentication
- Password hashing với bcrypt
- CORS protection
- Rate limiting
- Helmet security headers

## Development

1. Cài đặt dev dependencies:

```bash
npm install --save-dev nodemon
```

2. Chạy server với nodemon:

```bash
npm run dev
```

## Testing

```bash
npm test
```

## Contributing

1. Fork repository
2. Tạo branch mới (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add some amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Tạo Pull Request

## License

ISC
