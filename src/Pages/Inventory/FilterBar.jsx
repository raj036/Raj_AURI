import React, { useState } from "react";
import "./FilterBar.css";
import Search from "../Inventory/Search.svg";
import k from "../Inventory/Shortcutwrapper.svg";
import filter from "../Inventory/filter-lines.svg";
import ButtonClose from "../Inventory/Buttonclose.svg";

const FILTER_OPTIONS = [
  { label: "Status: Active", value: "active" },
  { label: "Chemicals", value: "chemicals" },
];

const FilterBar = ({ value, onChange, onFiltersChange }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]);

  const handleFilterClick = () => {
    setShowDropdown((prev) => !prev);
  };

  const handleOptionClick = (option) => {
    if (!selectedFilters.some((f) => f.value === option.value)) {
      const next = [...selectedFilters, option];
      setSelectedFilters(next);
      onFiltersChange && onFiltersChange(next.map((f) => f.value)); // 🔹 notify parent
    }
    setShowDropdown(false);
  };

  const handleRemoveFilter = (val) => {
    const next = selectedFilters.filter((f) => f.value !== val);
    setSelectedFilters(next);
    onFiltersChange && onFiltersChange(next.map((f) => f.value)); // 🔹 notify parent
  };

  return (
    <div
      className="searchbar-main"
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
      }}
    >
      <input
        type="text"
        className="searchbar"
        placeholder="Search"
        value={value || ""}
        onChange={(e) => onChange && onChange(e.target.value)}
      />
      <img src={Search} alt="Searchbar" className="search-icon" />
      <img src={k} alt="shortcut wraper" className="shorcut" />

      {/* chips (keep your positioning) */}
      <div
        style={{
          display: "flex",
          gap: "30px",
          alignItems: "center",
          paddingRight: "10%",
          marginLeft: "auto",
          marginRight: "8px",
        }}
      >
        {selectedFilters.map((f) => (
          <div
            key={f.value}
            className="filter-chip"
            style={{
              background: "#fff",
              border: "1px solid #D5D7DA",
              borderRadius: "8px",
              padding: "0 12px",
              height: "40px",
              display: "flex",
              alignItems: "center",
              fontFamily: "Inter, sans-serif",
              color: "#414651",
              fontSize: "14px",
              fontWeight: 600,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {f.label}
            <img
              src={ButtonClose}
              alt="close"
              style={{
                width: "20px",
                height: "20px",
                marginLeft: "6px",
                cursor: "pointer",
              }}
              onClick={() => handleRemoveFilter(f.value)}
            />
          </div>
        ))}
      </div>

      <button className="filter" onClick={handleFilterClick}>
        Filters
      </button>
      <img src={filter} alt="filtericon" className="filtericon" />

      {showDropdown && (
        <div
          style={{
            position: "absolute",
            top: "60px",
            right: "30px",
            background: "#fff",
            border: "1px solid #D5D7DA",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            zIndex: 10,
            minWidth: "160px",
          }}
        >
          {FILTER_OPTIONS.map((option) => (
            <div
              key={option.value}
              style={{
                padding: "10px 16px",
                cursor: "pointer",
                fontFamily: "Inter, sans-serif",
                borderBottom: "1px solid #eee",
              }}
              onClick={() => handleOptionClick(option)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterBar;
