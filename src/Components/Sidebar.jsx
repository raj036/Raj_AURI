import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";
import Logo from '../assets/Logomark.svg';
import Signup from '../assets/Signup.svg';
import Documents from '../assets/Documnet.svg'
import Subscribe from '../assets/Subscribe.svg';
import message from '../assets/message.svg'

const Sidebar = () => {
  return (
    <div className="sidebar-container">
      {/* Logo Section */}
      <div className="sidebar-logo">
        <img src={Logo} alt="Seravion Logo" className="logo-img" />
        <h2 className="logo-text">Seravion</h2>
      </div>

      {/* Steps Section */}
      <div className="sidebar-steps">
        {/* Step 1 */}
        <div className="sidebar-step">
          <div className="icon-box">
            <img src={Signup} alt="Signup" />
          </div>
          <div className="step-text">
            <p className="step-title">Signup</p>
            <p className="step-subtitle">Enter Organization Details</p>
          </div>
        </div>

        {/* Connector Line */}
        <div className="sidebar-line"></div>

        {/* Step 2 */}
        <div className="sidebar-step">
          <div className="icon-box">
            <img src={Documents} alt="Company & Document" />
          </div>
          <div className="step-text">
            <Link to="/company-information" className="sidebar-link">
              <p className="step-title">Company & Document</p>
              <p className="step-subtitle">Choose a secure password</p>
            </Link>
          </div>
        </div>

        {/* Connector Line */}
        <div className="sidebar-line"></div>

        {/* Step 3 */}
        <div className="sidebar-step">
          <div className="icon-box">
            <img src={Subscribe} alt="Subscription" />
          </div>
          <div className="step-text">
            <Link to="/subscription" className="sidebar-link">
              <p className="step-title">Subscription</p>
              <p className="step-subtitle">Submit Required Compliance Proofs</p>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div className="sidebar-footer">
        <img src={message} alt="Mail" className="mail-icon" />
        <span className="footer-email">help@seravion.com</span>
      </div>
    </div>
  );
};

export default Sidebar;
