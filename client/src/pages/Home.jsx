import { useState, useEffect } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";
import SearchBar from "../components/SearchBar";

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
    <div className="max-w-3xl mx-auto mt-10">
      <h1 className="text-3xl font-bold text-center">AI Blog Generator</h1>

      <div className="mt-5">
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </div>

      <div className="mt-5 space-y-4">
        {filteredBlogs.map((blog) => (
          <BlogCard key={blog._id} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default Home;
