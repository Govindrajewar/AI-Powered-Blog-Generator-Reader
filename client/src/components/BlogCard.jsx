import { Card, CardContent, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const BlogCard = ({ blog }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="shadow-lg hover:shadow-xl transition duration-300">
        <CardContent>
          <Typography variant="h5" fontWeight="bold">
            {blog.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" className="mt-2">
            {blog.content.substring(0, 150)}...
          </Typography>
          <Button
            component={Link}
            to={`/blog/${blog._id}`}
            variant="contained"
            color="primary"
            className="mt-3"
          >
            Read More
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default BlogCard;
