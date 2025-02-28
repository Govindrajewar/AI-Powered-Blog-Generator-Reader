require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");

const app = express();
app.use(cors());
app.use(express.json());

let blogs = [];

// Use dynamic import for `node-fetch`
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

// ✅ **Improved AI Blog Generation using Cohere**
const generateBlogContent = async (topic) => {
  const API_URL = "https://api.cohere.ai/v1/generate";
  const headers = {
    Authorization: `Bearer ${process.env.COHERE_API_KEY}`, // Secure API Key
    "Content-Type": "application/json",
  };

  const body = JSON.stringify({
    model: "command-r", // Free AI model for blog generation
    prompt: `Write a detailed, informative blog post about "${topic}". Include an introduction, several paragraphs explaining key concepts, examples, and a conclusion. Make it engaging and human-like.`,
    max_tokens: 700, // Increased token size for better output
  });

  try {
    const response = await fetch(API_URL, { method: "POST", headers, body });
    const data = await response.json();

    // Check if we received the expected data
    if (data?.generations?.length > 0) {
      return data.generations[0].text.trim();
    } else {
      return `A blog on "${topic}". (AI response issue)`;
    }
  } catch (error) {
    console.error("AI API Error:", error);
    return `Failed to generate a blog on "${topic}". Please try again later.`;
  }
};

// CREATE - Generate and store a new blog
app.post("/generate-blog", async (req, res) => {
  const { topic } = req.body;
  if (!topic) return res.status(400).json({ message: "Topic is required" });

  const content = await generateBlogContent(topic);
  const newBlog = {
    _id: uuidv4(),
    title: `Blog on ${topic}`,
    content,
  };

  blogs.unshift(newBlog);
  res.status(201).json(newBlog);
});

// READ - Fetch all blogs
app.get("/blogs", (req, res) => res.json(blogs));

// READ - Fetch a single blog by ID
app.get("/blogs/:id", (req, res) => {
  const blog = blogs.find((b) => b._id === req.params.id);
  if (!blog) return res.status(404).json({ message: "Blog not found" });
  res.json(blog);
});

// UPDATE - Edit a blog by ID
app.put("/blogs/:id", (req, res) => {
  const { title, content } = req.body;
  const blogIndex = blogs.findIndex((b) => b._id === req.params.id);

  if (blogIndex === -1)
    return res.status(404).json({ message: "Blog not found" });

  blogs[blogIndex] = { ...blogs[blogIndex], title, content };
  res.json(blogs[blogIndex]);
});

// DELETE - Remove a blog by ID
app.delete("/blogs/:id", (req, res) => {
  const blogIndex = blogs.findIndex((b) => b._id === req.params.id);
  if (blogIndex === -1)
    return res.status(404).json({ message: "Blog not found" });

  blogs.splice(blogIndex, 1);
  res.json({ message: "Blog deleted successfully" });
});

// Start server
app.listen(5000, () =>
  console.log(`🚀 Server running on http://localhost:5000`)
);
