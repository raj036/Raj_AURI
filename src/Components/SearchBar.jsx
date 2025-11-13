import React from "react";
import "./SearchBar.css";

const SearchBar = ({ buttonLabel = "Add Product", onButtonClick }) => {
  return (
    <div className="search-bar">
      <button onClick={onButtonClick}>
        <span style={{ fontSize: "1.25rem", fontWeight: "500" }}>+</span>
        {buttonLabel}
      </button>
    </div>
  );
};

export default SearchBar;
