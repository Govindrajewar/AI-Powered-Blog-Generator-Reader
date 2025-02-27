const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const OpenAI = require("openai");

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Blog Schema
const BlogSchema = new mongoose.Schema({ title: String, content: String });
const Blog = mongoose.model("Blog", BlogSchema);

// OpenAI Setup
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Generate Blog Post
app.post("/generate", async (req, res) => {
  try {
    const { topic } = req.body;
    const response = await openai.completions.create({
      model: "text-davinci-003",
      prompt: `Write a blog post about ${topic}`,
      max_tokens: 500,
    });

    const newBlog = new Blog({
      title: topic,
      content: response.choices[0].text,
    });
    await newBlog.save();
    res.json(newBlog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get All Blogs
app.get("/blogs", async (req, res) => {
  const blogs = await Blog.find();
  res.json(blogs);
});

// Default Homepage
app.get("/", (req, res) => {
  res.json({ message: "Home page for AI-Powered Blog Generator & Reader" });
});

// Start Server
app.listen(4000, () => console.log("Server running on port 4000"));
