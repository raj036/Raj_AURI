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
import BuildIcon from "@mui/icons-material/Build"; // Services
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong"; // Tax
import AccountBalanceIcon from "@mui/icons-material/AccountBalance"; // Bank
import PeopleIcon from "@mui/icons-material/People";

const BranchSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [openMenu, setOpenMenu] = useState(null);

  const isActive = (path) => location.pathname === path;

  const menuItems = [
    { id: "home", path: "/dashboard", label: "Home", icon: <HomeIcon /> },
    {
      id: "inventory",
      label: "Inventory",
      icon: <BarChartIcon />,
      badge: <KeyboardArrowRightIcon />,
      children: [
        { path: "/inventory", label: "Inventory Dashboard" },
        { path: "/Inventory-Dashboard", label: "Products" },
        { path: "/Inventory-Dashboard", label: "Stock Management" },
        { path: "/Inventory-Dashboard", label: "Low Stock Alerts" },
      ],
    },
    {
      id: "purchase-order",
      label: "Purchase",
      icon: <BarChartIcon />,
      badge: <KeyboardArrowRightIcon />,
      children: [
        { path: "/Inventory-Dashboard", label: "Purchase Dashboard" },
        { path: "/Vendors", label: "Vendors" },
        { path: "/purchase-orders", label: "Purchase Orders" },
        { path: "/Bills", label: "Bills" },
        { path: "/Inventory-Dashboard", label: "Vendor Payments" },
      ],
    },
    {
      id: "sell-order",
      label: "Sales",
      icon: <GroupIcon />,
      badge: <KeyboardArrowRightIcon />,
      children: [
        { path: "/sales-dashboard", label: "Sales Dashboard" },
        { path: "/Quotation-Management", label: "Quotations" },
        { path: "/Sales-Ledger", label: "Sales Order" },
        { path: "/Customer-Management", label: "Customers" },
        { path: "/Invoices", label: "Invoices" },
        { path: "/Payments-Received", label: "Payment Received" },
        { path: "/Sales-Return", label: "Sales Return" },
        { path: "/Credit-Notes", label: "Credit Note" },
      ],
    },
    {
      id: "crm",
      path: "/crm",
      label: "CRM",
      icon: <GroupIcon />,
      badge: <KeyboardArrowRightIcon />,
      children: [
        { path: "/Inventory-Dashboard", label: "CRM Dashboard" },
        { path: "/Inventory-Dashboard", label: "Follow-ups" },
        { path: "/Inventory-Dashboard", label: "Leads" },
      ],
    },
    {
      id: "shipping",
      label: "Shipping & Logistics",
      icon: <GroupIcon />,
      badge: <KeyboardArrowRightIcon />,
      children: [
        { path: "/Shipments", label: "Shipments" },
        { path: "/Packages", label: "Packages" },
        { path: "/Delivery-Chalan", label: "Delivery Challans" },
      ],
    },
    {
      id: "operations",
      label: "Operations",
      icon: <GroupIcon />,
      badge: <KeyboardArrowRightIcon />,
      children: [
        { path: "/Services", label: "Services" },
        { path: "/Task-Management", label: "Task Management" },
      ],
    },
    {
      id: "accounting",
      label: "Accounting",
      icon: <GroupIcon />,
      badge: <KeyboardArrowRightIcon />,
      children: [
        { path: "/account-dashboard", label: "Accounting Dashboard (Journals)" },
        { path: "/Inventory-Dashboard", label: "Journals" },
        { path: "/Inventory-Dashboard", label: "Ledger" },
        { path: "/Inventory-Dashboard", label: "Chart of Accounts" },
        { path: "/Bank", label: "Bank" },
        { path: "/Tax", label: "Tax" },
        { path: "/Inventory-Dashboard", label: "Vouchers" },
      ],
    },
    {
      id: "human-resource",
      path: "/human-resource",
      label: "Human Resource(HR)",
      icon: <GroupIcon />,
      badge: <KeyboardArrowRightIcon />,
      children: [
        { path: "/Staff", label: "Staff Management" },
        { path: "/attendance-management", label: "Attendance" },
        { path: "/Leave-Management", label: "Leave Management" },
        { path: "/Inventory-Dashboard", label: "Payslips" },
      ],
    },

  ];

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

            {/* ✅ Submenu only if open */}
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

export default BranchSidebar;
