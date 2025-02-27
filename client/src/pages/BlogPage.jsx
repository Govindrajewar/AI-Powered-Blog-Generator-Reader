import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Typography, CircularProgress } from "@mui/material";

const BlogPage = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/blogs`).then((res) => {
      const foundBlog = res.data.find((b) => b._id === id);
      setBlog(foundBlog);
    });
  }, [id]);

  if (!blog) return <CircularProgress className="mt-10 mx-auto block" />;

  return (
    <Container
      maxWidth="md"
      className="mt-10 p-5 bg-white shadow-lg rounded-lg"
    >
      <Typography variant="h3" fontWeight="bold" gutterBottom>
        {blog.title}
      </Typography>
      <Typography
        variant="body1"
        color="text.primary"
        className="mt-4 leading-relaxed"
      >
        {blog.content}
      </Typography>
    </Container>
  );
};

export default BlogPage;
