import React from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as BackgroundLines } from "../../assets/background.svg";
import { ReactComponent as Logo } from "../../assets/tick.svg";
import "./PasswordReset.css";

const PasswordReset = () => {
  const navigate = useNavigate();

  return (
    <div className="forgot-container">
      <BackgroundLines className="background-lines" />
      <div className="forgot-box">
        <div className="icon-wrapper">
          <Logo className="logo" />
        </div>
        <p className="subtitle">
          Your password has been successfully reset.
          <br /> Click below to log in magically.
        </p>
        <button className="primary-btn">Continue</button>

        <button className="back-btn" onClick={() => navigate("/")}>
          ← Back to log in
        </button>
      </div>
    </div>
  );
};

export default PasswordReset;
