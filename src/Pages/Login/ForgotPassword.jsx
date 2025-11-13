import React from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as BackgroundLines } from "../../assets/background.svg";
import { ReactComponent as Logo } from "../../assets/message.svg";
import "./ForgotPassword.css";

const ForgotPassword = () => {
  const navigate = useNavigate();

  return (
    <div className="forgot-container">
      <BackgroundLines className="background-lines" />
      <div className="forgot-box">
        <div className="icon-wrapper">
          <Logo className="logo" />
        </div>
        <h2 className="title">Check your email</h2>
        <p className="subtitle">
          We sent a password reset link to <br />
          <p style={{ marginTop: "20px", fontWeight: "600" }}>
            suraj@gmail.com
          </p>
        </p>
        <button className="primary-btn">Open email app</button>
        <p className="resend-text">
          Didn’t receive the email? <a href="#">Click to resend</a>
        </p>
        <button className="back-btn" onClick={() => navigate("/")}>
          ← Back to log in
        </button>
      </div>
    </div>
  );
};

export default ForgotPassword;
