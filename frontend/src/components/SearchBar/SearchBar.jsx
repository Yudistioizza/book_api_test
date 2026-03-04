import { useState, useEffect } from "react";
import "./SearchBar.css";

function SearchBar({ onSearch }) {
  const [value, setValue] = useState("");

  // Debounce search (300ms)
  useEffect(() => {
    const delay = setTimeout(() => {
      onSearch(value);
    }, 300);

    return () => clearTimeout(delay);
  }, [value]);

  return (
    <div className="searchbar-container">
      <span className="search-icon">🔍</span>
      <input
        type="text"
        placeholder="Search by title or description..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="search-input"
      />
    </div>
  );
}

export default SearchBar;