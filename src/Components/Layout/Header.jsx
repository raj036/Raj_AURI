import React from "react";
import "./Header.css";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const Header = () => {
  return (
    <header className="header">
      <div className="header-left">
        <h2>
          Welcome, <span className="username">Suraj</span> 👋
        </h2>
      </div>
      <div className="header-right">
        <button className="org-select">
          PestGuard Solutions (HSR) <ArrowDropDownIcon />
        </button>
      </div>
    </header>
  );
};

export default Header;
