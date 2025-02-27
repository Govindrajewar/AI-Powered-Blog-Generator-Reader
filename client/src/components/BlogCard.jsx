import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const BlogCard = ({ blog }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Link to={`/blog/${blog._id}`} className="block">
        <div className="bg-white shadow-md rounded-lg p-5 hover:shadow-lg transition duration-300">
          <h2 className="text-xl font-bold">{blog.title}</h2>
          <p className="text-gray-600 mt-2">
            {blog.content.substring(0, 150)}...
          </p>
          <p className="text-blue-500 mt-2">Read More →</p>
        </div>
      </Link>
    </motion.div>
  );
};

export default BlogCard;
