import { useState, useEffect } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";
import SearchBar from "../components/SearchBar";
import { Container, Grid, Typography, TextField, Button } from "@mui/material";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [newTopic, setNewTopic] = useState("");

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = () => {
    axios.get("http://localhost:5000/blogs").then((res) => setBlogs(res.data));
  };

  const generateBlog = () => {
    if (!newTopic.trim()) return;
    axios
      .post("http://localhost:5000/generate-blog", { topic: newTopic })
      .then(() => {
        setNewTopic(""); // Clear input field
        fetchBlogs(); // Refresh blogs
      })
      .catch((err) => console.error("Error generating blog:", err));
  };

  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container maxWidth="lg" className="mt-10">
      <Typography
        variant="h4"
        fontWeight="bold"
        textAlign="center"
        gutterBottom
      >
        AI Blog Generator
      </Typography>

      {/* Search Bar */}
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {/* Input for New Topic */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <TextField
          label="Enter blog topic..."
          variant="outlined"
          fullWidth
          value={newTopic}
          onChange={(e) => setNewTopic(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={generateBlog}>
          Generate
        </Button>
      </div>

      {/* Display Blogs */}
      <Grid container spacing={3}>
        {filteredBlogs.map((blog) => (
          <Grid item xs={12} sm={6} md={4} key={blog._id}>
            <BlogCard blog={blog} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;
