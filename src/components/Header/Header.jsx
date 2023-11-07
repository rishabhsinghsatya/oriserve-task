import React, { useState } from "react";
import "./header.css";
import FlickrImages from "../Image";

function Header() {
  const [text, setText] = useState("cat");

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
        <button className="btn">Search</button>
      </div>
      <FlickrImages text={text} set />
    </div>
  );
}

export default Header;
