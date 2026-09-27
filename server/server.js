const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const userRouter = require("./routes/user-routes");
const blogRouter = require("./routes/blog-routes");

require("./config/db");

const app = express();

// ===============================
// CORS
// ===============================

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ===============================
// Helmet
// ===============================

app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
  })
);

// ===============================
// Body Parser
// ===============================

app.use(express.json());

// ===============================
// Routes
// ===============================

app.use("/api/users", userRouter);
app.use("/api/blogs", blogRouter);

// ===============================
// Test Routes
// ===============================

app.get("/", (req, res) => {
  res.status(200).send("Blog API is running successfully 🚀");
});

app.get("/api", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Blog API is working 🚀",
  });
});

// ===============================
// 404 Route
// ===============================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    path: req.originalUrl,
  });
});

// ===============================
// Error Handler
// ===============================

app.use((err, req, res, next) => {
  console.error("Server Error:", err);

  res.status(500).json({
    success: false,
    message: "Internal Server Error",
    error: err.message,
  });
});

// ===============================
// Start Server
// ===============================

const PORT = process.env.PORT || 5001;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});