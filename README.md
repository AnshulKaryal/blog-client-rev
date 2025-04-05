# MERN Blog Application - Frontend

This is the frontend of the MERN stack-based Blog Application built using **React**. The app allows users to register, log in, create, edit, delete, and view blogs from all users with pagination support.

## 🌐 Features

- 🔐 **User Authentication** (JWT-based)
- 📝 **Create, Read, Update, Delete Blogs**
- 👥 **View Blogs from Other Users**
- 📄 **Blog Pagination**
- 🎨 **Responsive UI using Tailwind CSS**
- 🔄 **Protected Routes based on Auth Token**

---

## 🚀 Live Demo

🔗 [Click here to view the live app](https://blog-client-rev.vercel.app)

---
## 📁 Project Structure

```bash
src/
├── api/
│   └── api.js
├── components/
│   └── Header.jsx
├── pages/
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── CreateBlog.jsx
│   ├── MyBlog.jsx
│   ├── Home.jsx
│   ├── ViewBlog.jsx
│   ├── UpdateBlog.jsx
│   └── UserBlogs.jsx
├── App.js
└── index.js
```

---


## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or above)
- npm

### Installation

1. Clone the repository:

```bash
git clone https://github.com/AnshulKaryal/blog-client-rev.git
cd blog-client-rev
```
2. Install dependencies:

```bash
npm install
```
3. Start the development server:

```bash
npm start
```
By default, the app runs on http://localhost:3000.


## 📌 Notes
- Make sure the backend server is running for full functionality.
- Update the API endpoint in `src/api/api.js` to http://localhost:3027 for localhost testing.
