const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let blogs = [
  {
    _id: "1",
    title: "Understanding React Hooks",
    content:
      "React Hooks allow you to use state and lifecycle features without writing a class...",
  },
  {
    _id: "2",
    title: "Getting Started with Node.js",
    content:
      "Node.js is a powerful JavaScript runtime built on Chrome's V8 engine...",
  },
  {
    _id: "3",
    title: "Mastering Tailwind CSS",
    content:
      "Tailwind CSS is a utility-first CSS framework for rapid UI development...",
  },
];

// 📌 API: Get all blog posts
app.get("/blogs", (req, res) => {
  res.json(blogs);
});

// 📌 API: Get a single blog post by ID
app.get("/blogs/:id", (req, res) => {
  const blog = blogs.find((b) => b._id === req.params.id);
  if (!blog) return res.status(404).json({ message: "Blog not found" });
  res.json(blog);
});

// 📌 API: Generate a blog post (Mocked Response)
app.post("/generate-blog", (req, res) => {
  const { topic } = req.body;

  if (!topic) {
    return res.status(400).json({ message: "Topic is required" });
  }

  const generatedBlog = {
    _id: (blogs.length + 1).toString(),
    title: `AI-Generated Blog on ${topic}`,
    content: `This is a mock-generated blog post about ${topic}. AI-generated content goes here...`,
  };

  blogs.unshift(generatedBlog); // Add to the beginning of the list
  res.status(201).json(generatedBlog);
});

// 📌 API: Delete a blog post
app.delete("/blogs/:id", (req, res) => {
  const blogIndex = blogs.findIndex((b) => b._id === req.params.id);
  if (blogIndex === -1)
    return res.status(404).json({ message: "Blog not found" });

  blogs.splice(blogIndex, 1);
  res.json({ message: "Blog deleted successfully" });
});

// Start the server
const PORT = 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
