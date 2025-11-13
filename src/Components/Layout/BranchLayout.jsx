import React from "react";
import BranchSideBar from "./BranchSideBar";
import Header from "./Header";
import "./Layout.css";
import "./Sidebar.css";

const BranchLayout = ({ children }) => {
  return (
    <div className="layout">
      <BranchSideBar />
      <div className="main-content">
        <Header />
        <div className="page-content">{children}</div>
      </div>
    </div>
  );
};

export default BranchLayout;
