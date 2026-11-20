# Backend Development Exit Test

**Student:** Mayank Agrawal
**Registration Number:** PIET24CD032

This repository contains both required backend tasks.

## Project 1: Library Book Management API

Folder: `Task1_Library_API`

### Setup

1. Open a terminal in `Task1_Library_API`.
2. Run `npm install`.
3. Copy `.env.example` to `.env`.
4. Set `MONGODB_URI` to your MongoDB connection string.
5. Run `npm start`.

Default URL: `http://localhost:3000`

### Endpoints

- `POST /books`
- `GET /books`
- `GET /books/:id`
- `PUT /books/:id`
- `DELETE /books/:id`

Example create body:

```json
{
  "title": "The Alchemist",
  "author": "Paulo Coelho",
  "price": 250,
  "category": "Fiction",
  "isAvailable": true
}
```

## Project 2: Student Portal

Folder: `Task2_Student_Portal`

### Setup

1. Open a terminal in `Task2_Student_Portal`.
2. Run `npm install`.
3. Copy `.env.example` to `.env`.
4. Set `MONGODB_URI` and a long random `JWT_SECRET`.
5. Run `npm start`.

Default URL: `http://localhost:3001`

### Endpoints

- `POST /register`
- `POST /login`
- `GET /profile` (Bearer token required)
- `GET /students` (admin Bearer token required)

Example register body:

```json
{
  "name": "Mayank Agrawal",
  "email": "mayank.student@example.com",
  "password": "secret123",
  "role": "student"
}
```

For an admin account, use `"role": "admin"` when registering for local exam demonstration. In a production system, public users must not be allowed to assign themselves the admin role; admin creation should be restricted.

## Security and submission notes

- `.env` files and `node_modules` are excluded using `.gitignore`.
- Never upload real database credentials or JWT secrets to a public GitHub repository.
- 

- Save actual API testing screenshots in `outputs/Task1/` and `outputs/Task2/`.
- Task 1 screenshots: `A1.png`, `A2.png`, `A3.png`.
- Task 2 screenshots: `A1.png`, `A2.png`, `A3.png`.
- Screenshots may show actual PowerShell or Postman API responses.
