# 📝 BlogsApp - Full Stack MERN Blog Application

A modern, full-stack web application built using the **MERN** stack (MongoDB, Express.js, React, Node.js) where users can create, manage, and read blog posts with user authentication and theme toggling.

🚀 **Live Demo:** [https://bloa-app-drab.vercel.app/login](https://bloa-app-drab.vercel.app/login)

---

## ✨ Features

- 🔐 **User Authentication:** Secure Signup & Login functionality.
- 📰 **All Blogs Feed:** Browse and read blogs posted by all users across the platform.
- 👤 **My Blogs Dashboard:** View a personalized list of blogs created by the logged-in user.
- ✍️ **Create & Publish:** Add new blogs with custom titles and content descriptions.
- ✏️ **Manage Posts:** Full CRUD capability to edit or delete your own blog posts.
- 🌓 **Theme Toggle:** Switch easily between Light and Dark display modes.
- 📱 **Responsive Design:** Clean and accessible UI built for all device screen sizes.

---

## 🛠️ Tech Stack

### **Frontend**
- **React.js** - UI Library
- **Material-UI (MUI)** / **CSS3** - Component styling & layout
- **Axios** - HTTP client for API requests
- **React Router** - Single Page Application (SPA) routing

### **Backend**
- **Node.js** - JavaScript Runtime Environment
- **Express.js** - Backend Web Framework
- **MongoDB** & **Mongoose** - Database & Object Data Modeling (ODM)
- **JSON Web Tokens (JWT)** & **Bcrypt.js** - Authentication & Password Hashing

### **Deployment**
- **Vercel** - Frontend & Backend hosting

---

## 📸 Screenshots

| Login Page | Signup Page |
| :---: | :---: |
| ![Login Page](https://github.com/user-attachments/assets/898f54d2-b8fa-4c60-a128-76ee1b8ba7c6) | ![Signup Page](https://github.com/user-attachments/assets/dc20c691-388e-43a0-a17a-08a004180358) |

| All Blogs Feed | My Blogs (Edit / Delete) | Add New Blog |
| :---: | :---: | :---: |
| ![All Blogs](https://github.com/user-attachments/assets/58c3bd99-5fa4-433d-bc21-581bb8e3de26) | ![My Blogs](https://github.com/user-attachments/assets/8a986f02-7b66-4ac9-84db-ec92e07ba843) | ![Add Blog](https://github.com/user-attachments/assets/69bf9476-337c-4832-b794-9e2c6495c8f3) |

---

## ⚡ Getting Started Locally

Follow these steps to run the application locally on your machine.

### **Prerequisites**
- [Node.js](https://nodejs.org/) installed (v14+ recommended)
- [MongoDB](https://www.mongodb.com/) account or local instance

### **1. Clone the Repository**
```bash
git clone [https://github.com/omkarbhong999/Bloa-app.git](https://github.com/omkarbhong999/Bloa-app.git)
cd Bloa-app

PORT=5001
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key

npm start

# Navigate to frontend directory
cd frontend

# Install frontend dependencies
npm install

# Start React development server
npm start
