import React, { useState, useEffect } from "react";
import "./header.css";
import FlickrImages from "../Image";

function Header() {
  const [text, setText] = useState("cat");
  const [searchHistory, setSearchHistory] = useState([]);
  const [suggestion, setSuggestion] = useState(" ");
  const [editing, setEditing] = useState(false);
  const [blurTimeout, setBlurTimeout] = useState(null);

  useEffect(() => {
    const savedHistory = localStorage.getItem("searchHistory");
    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory));
    }
  }, []);

  const handleSearch = () => {
    const updatedHistory = [...searchHistory, text];
    setSearchHistory(updatedHistory);
    localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
  };

  const handleClearHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem("searchHistory");
  };
  const handleInputBlur = () => {
    const delayMs = 500;
    setBlurTimeout(
      setTimeout(() => {
        setEditing(false);
      }, delayMs)
    );
  };
  const handleInputFocus = () => {
    if (blurTimeout) {
      clearTimeout(blurTimeout);
    }
    setEditing(true);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
    <>
      <div className="header">
        <h1>Search Photos</h1>
        <div className="searchBar">
          <input
            type="text"
            className="search"
            placeholder="Search images..."
            value={text}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            onChange={(e) => {
              setText(e.target.value);
            }}
            onKeyDown={handleKeyDown}
          />
          <button className="btn" onClick={handleSearch}>
            Search
          </button>
        </div>
        {editing && searchHistory.length > 1 && (
          <div className="suggestionBox">
            <div className="suggestion">
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
              Clear
            </button>
          </div>
        )}
      </div>
      <FlickrImages text={text} />
    </>
  );
}

export default Header;
