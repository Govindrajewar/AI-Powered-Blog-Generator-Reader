import express from "express";
const app = express();
app.use(express.json());

// Default Homepage
app.get("/", (req, res) => {
  res.json({ message: "Home page for AI-Powered Blog Generator & Reader" });
});

// Start Server
app.listen(5000, () => console.log("Server running on port 5000"));
