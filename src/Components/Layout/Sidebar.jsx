import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Sidebar.css";
import HomeIcon from "@mui/icons-material/Home";
import BarChartIcon from "@mui/icons-material/BarChart";
import ListAltIcon from "@mui/icons-material/ListAlt";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import PieChartIcon from "@mui/icons-material/PieChart";
import GroupIcon from "@mui/icons-material/Group";
import { ReactComponent as Logo } from "../../assets/Logomark.svg";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import SettingsIcon from "@mui/icons-material/Settings";
import BuildIcon from "@mui/icons-material/Build";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import PeopleIcon from "@mui/icons-material/People";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [openMenu, setOpenMenu] = useState(null);

  const userRole = "Admin"; 

  const isActive = (path) => location.pathname === path;

  // Common menu items available to all roles
  const allMenuItems = [
    { id: "home", path: "/", label: "Home", icon: <HomeIcon /> },
    {
      id: "inventory",
      path: "/inventory",
      label: "Inventory Management",
      icon: <BarChartIcon />,
    },
    {
      id: "user-mgmt",
      path: "/user-management",
      label: "User Management",
      icon: <GroupIcon />,
    },
     {
      id: "task-mgmt",
      path: "/Task-Management",
      label: "Task Management",
      icon: <GroupIcon />,
    },
     {
      id: "perfomance-mgmt",
      path: "/perfomance-management",
      label: "Perfomance Management",
      icon: <GroupIcon />,
    },
    {
      id: "branch-mgmt",
      path: "/branch-management",
      label: "Branch Management",
      icon: <AssignmentTurnedInIcon />,
    },
    {
      id: "sell-order",
      label: "Sales",
      icon: <ListAltIcon />,
      badge: <KeyboardArrowRightIcon />,
      children: [
        { path: "/Sales-Ledger", label: "Purchase/Sale Order" },
        { path: "/sales-orders", label: "Create Sale Order" },
        { path: "/Sales-Return", label: "Sales Returns" },
        { path: "/Credit-Notes", label: "Credit Notes" },
        { path: "/Customer-Management", label: "Customers", badge: 10 },
      ],
    },
    {
      id: "services",
      path: "/Services",
      label: "Services",
      icon: <BuildIcon />,
    },
    { id: "tax", path: "/Tax", label: "Tax", icon: <ReceiptLongIcon /> },
    { id: "bank", path: "/Bank", label: "Bank", icon: <AccountBalanceIcon /> },
    { id: "staff", path: "/Staff", label: "Staff", icon: <PeopleIcon /> },
  ];

  // Role-based restrictions
  const roleBasedMenu = {
    Admin: allMenuItems,
    Manager: allMenuItems.filter(item => item.id !== "user-mgmt" && item.id !== "tax"),
    Faculty: allMenuItems.filter(item => 
      ["home", "inventory", "sell-order", "services", "bank", "staff"].includes(item.id)
    ),
  };

  const menuItems = roleBasedMenu[userRole] || [];

  const handleParentClick = (item) => {
    if (item.children) {
      // toggle submenu
      setOpenMenu(openMenu === item.id ? null : item.id);
    } else {
      // direct navigation
      navigate(item.path);
    }
  };

  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="icon-wrapper">
        <Logo className="logo" />
        <span className="sidebar-label logo-label">AuriFex</span>
      </div>

      {/* Menu */}
      <nav className="sidebar-menu">
        {menuItems.map((item) => (
          <div
            key={item.id}
            className={`menu-item-wrapper ${
              item.children ? "has-submenu" : ""
            }`}
          >
            <button
              className={`menu-item ${
                item.path && isActive(item.path) ? "active" : ""
              }`}
              onClick={() => handleParentClick(item)}
            >
              <span className="menu-icon">{item.icon}</span>
              <span className="sidebar-label">{item.label}</span>
              {item.badge && <span className="badge">{item.badge}</span>}
            </button>

            {/* Submenu only if open */}
            {item.children && openMenu === item.id && (
              <div className="submenu">
                {item.children.map((child) => (
                  <button
                    key={child.path}
                    className={`submenu-item ${
                      isActive(child.path) ? "active" : ""
                    }`}
                    onClick={() => navigate(child.path)}
                  >
                    {child.label}
                    {child.badge && (
                      <span className="badge">{child.badge}</span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="sidebar-footer">
        <button className="menu-item">
          <span className="menu-icon">
            <HelpOutlineIcon />
          </span>
          <span className="sidebar-label">Support</span>
        </button>
        <button className="menu-item">
          <span className="menu-icon">
            <SettingsIcon />
          </span>
          <span className="sidebar-label">Settings</span>
        </button>

        <div className="profile-card">
          <img
            src="https://randomuser.me/api/portraits/women/44.jpg"
            alt="Profile"
            className="profile-img"
          />
          <div className="profile-info">
            <p className="profile-name">Olivia Rhye</p>
            <p className="profile-email">olivia@untitledui.com</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
