import { TextField } from "@mui/material";

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <TextField
      label="Search blog posts..."
      variant="outlined"
      fullWidth
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      className="mb-5"
    />
  );
};

export default SearchBar;
