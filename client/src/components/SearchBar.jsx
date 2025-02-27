const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <input
      type="text"
      placeholder="Search blog posts..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-300 transition duration-200"
    />
  );
};

export default SearchBar;
