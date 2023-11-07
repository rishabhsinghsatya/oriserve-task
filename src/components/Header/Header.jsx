import React, { useState, useEffect } from "react";
import "./header.css";
import FlickrImages from "../Image";

function Header() {
  const [text, setText] = useState("cat");
  const [searchHistory, setSearchHistory] = useState([]);

  useEffect(() => {
    // Load search history from local storage when the component mounts
    const savedHistory = localStorage.getItem("searchHistory");
    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory));
    }
  }, []);

  const handleSearch = () => {
    // Update the search history and save it to local storage
    const updatedHistory = [...searchHistory, text];
    setSearchHistory(updatedHistory);
    localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
    // Perform the search
  };

  const handleClearHistory = () => {
    // Clear search history from state and local storage
    setSearchHistory([]);
    localStorage.removeItem("searchHistory");
  };

  return (
    <div className="header">
      <h1>Search Photos</h1>
      <div className="searchBar">
        <input
          type="text"
          className="search"
          placeholder="Search images..."
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
        <button className="btn" onClick={handleSearch}>
          Search
        </button>
      </div>
      <div className="suggestionBox">
        {searchHistory.map((query, index) => (
          <span
            key={index}
            className="searchHistoryItem"
            onClick={() => setText(query)}
          >
            {query}
          </span>
        ))}
      </div>
      <button className="clearBtn" onClick={handleClearHistory}>
        Clear Suggestions
      </button>
      <FlickrImages text={text} />
    </div>
  );
}

export default Header;
