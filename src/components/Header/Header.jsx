import React from "react";
import "./header.css";
function Header() {
  return (
    <div className="header">
      <h1>Search Photos</h1>
      <div className="searchBar">
        <input type="text" className="search" placeholder="Search images..." />
        <button className="btn">Search</button>
      </div>
    </div>
  );
}

export default Header;
