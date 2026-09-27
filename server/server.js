const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const userRouter = require("./routes/user-routes");
const blogRouter = require("./routes/blog-routes");

require("./config/db");

const app = express();

// ===============================
// Middleware
// ===============================

app.use(
  cors({
    origin: "*",
  })
);

app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
  })
);

app.use(express.json());

// ===============================
// Routes
// ===============================

app.use("/api/users", userRouter);
app.use("/api/blogs", blogRouter);

app.get("/api", (req, res) => {
  res.send("Blog API is running successfully 🚀");
});

// ===============================
// Port
// ===============================

const PORT = process.env.PORT || 5001;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});