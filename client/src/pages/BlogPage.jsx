import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const BlogPage = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/blogs`).then((res) => {
      const foundBlog = res.data.find((b) => b._id === id);
      setBlog(foundBlog);
    });
  }, [id]);

  if (!blog) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-5 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold">{blog.title}</h1>
      <p className="text-gray-700 mt-4">{blog.content}</p>
    </div>
  );
};

export default BlogPage;
