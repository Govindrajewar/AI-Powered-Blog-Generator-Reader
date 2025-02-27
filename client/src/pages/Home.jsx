import { useState, useEffect } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";
import SearchBar from "../components/SearchBar";
import { Container, Grid, Typography } from "@mui/material";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/blogs").then((res) => setBlogs(res.data));
  }, []);

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
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

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
