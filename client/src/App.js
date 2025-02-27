import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [topic, setTopic] = useState("");
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:4000/blogs").then((res) => setBlogs(res.data));
  }, []);

  const generateBlog = async () => {
    const res = await axios.post("http://localhost:4000/generate", { topic });
    setBlogs([...blogs, res.data]);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-2xl mx-auto bg-white p-5 rounded shadow">
        <h1 className="text-2xl font-bold mb-4">AI Blog Generator</h1>
        <input
          className="w-full p-2 border rounded mb-2"
          placeholder="Enter a topic..."
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />
        <button
          onClick={generateBlog}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Generate Blog
        </button>
      </div>

      <div className="max-w-2xl mx-auto mt-5">
        {blogs.map((blog, index) => (
          <div key={index} className="bg-white p-4 rounded shadow mb-3">
            <h2 className="text-xl font-bold">{blog.title}</h2>
            <p className="text-gray-600">{blog.content.substring(0, 150)}...</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
