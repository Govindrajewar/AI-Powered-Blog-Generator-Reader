import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import BlogPage from "./pages/BlogPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog/:id" element={<BlogPage />} />
      </Routes>
    </Router>
  );
}

export default App;
