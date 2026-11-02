
const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = require("./config/db");
const codeRoutes = require("./routes/codeRoutes");
const authRoutes = require("./routes/authRoutes");
const quizResultRoutes = require("./routes/quizResultRoutes");

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Online Quiz Assessment Backend is running",
  });
});

app.get("/api/test", (req, res) => {
  res.json({
    message: "Backend connection successful",
  });
});

app.use("/api/code", codeRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/quiz-results", quizResultRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
