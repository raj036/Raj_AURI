import React, { useState } from "react";
import { ReactComponent as BackgroundLines } from "../../assets/background.svg";
import { ReactComponent as Logo } from "../../assets/Logomark.svg";
import CheckIcon from "@mui/icons-material/Check";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import "./Login.css";
import { loginUser } from "../../Utils/apiServices";
import Cookies from "js-cookie"; 

const Login = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("login");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const passwordRules = [
    { label: "At least 8 characters", test: (pw) => pw.length >= 8 },
    { label: "One uppercase letter", test: (pw) => /[A-Z]/.test(pw) },
    { label: "One number", test: (pw) => /\d/.test(pw) },
  ];

  const allRulesPassed = passwordRules.every((rule) => rule.test(password));

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (activeTab === "login") {
      try {
        const res = await loginUser(email, password);

      if (res.status === 200) {
  const { accessToken, refreshToken, token } = res.data.data; // ✅ destructure from response

  // Store tokens in cookies
  Cookies.set("accessToken", accessToken, {
    expires: 1, // 1 day
    secure: true,
    sameSite: "strict",
  });
  Cookies.set("refreshToken", refreshToken, {
    expires: 7, // 7 days
    secure: true,
    sameSite: "strict",
  });

  // Save tokens in localStorage
  localStorage.setItem("isLoggedIn", "true");
  localStorage.setItem("token", token);
  localStorage.setItem("authToken", token);

  console.log("Login success:", res.data.data);

  // Navigate immediately
  navigate("/", { replace: true });
}
 else {
          alert("Login failed");
        }
      } catch (err) {
        console.error("Login Error:", err);
        alert(err.response?.data?.message || "Login failed");
      }
    }
  };

  console.log("Base URL:", process.env.REACT_APP_API_BASE_URL);

  return (
    <div className="login-container">
      <BackgroundLines className="background-lines" />

      <div className="login-box">
        {/* Logo */}
        <div className="icon-wrapper">
          <Logo className="logo" />
        </div>

        {/* Title & Subtitle */}
        <div className="text-center">
          <h2 className="title">
            {activeTab === "login"
              ? "Log in to your account"
              : "Create an account"}
          </h2>
          <p className="subtitle">
            {activeTab === "login"
              ? "Welcome back! Please enter your details."
              : "Start your journey with us."}
          </p>
        </div>

        {/* Tabs */}
        <div className="tab-switcher">
          <div
            className="tab-slider"
            style={{
              transform:
                activeTab === "signup" ? "translateX(0)" : "translateX(100%)",
            }}
          />
          <button
            type="button"
            className={`tab-btn ${activeTab === "signup" ? "active" : ""}`}
            onClick={() => {
              setActiveTab("signup");
              setPassword("");
            }}
          >
            Sign up
          </button>
          <button
            type="button"
            className={`tab-btn ${activeTab === "login" ? "active" : ""}`}
            onClick={() => {
              setActiveTab("login");
              setPassword("");
            }}
          >
            Log in
          </button>
        </div>

        {/* Form */}
        <form className="login-form" onSubmit={handleSubmit}>
          {activeTab === "signup" && (
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
          )}

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Password rules for Signup */}
          {activeTab === "signup" && (
            <ul className="password-rules">
              {passwordRules.map((rule, i) => {
                const isValid = rule.test(password);
                return (
                  <li
                    key={i}
                    className={isValid ? "rule-passed" : "rule-failed"}
                  >
                    {isValid ? (
                      <CheckIcon className="rule-icon passed" />
                    ) : (
                      <CloseIcon className="rule-icon failed" />
                    )}
                    {rule.label}
                  </li>
                );
              })}
            </ul>
          )}

          {/* Login extras */}
          {activeTab === "login" && (
            <div className="form-extra">
              <label className="checkbox-label">
                <input type="checkbox" />
                <span>Remember for 30 days</span>
              </label>
              <a
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = "/forgot-password";
                }}
              >
                Forgot password
              </a>
            </div>
          )}

          {/* Action button */}
          <button
            type="submit"
            className="sign-in-btn"
            disabled={activeTab === "signup" && !allRulesPassed}
          >
            {activeTab === "login" ? "Sign in" : "Create account"}
          </button>

          <div className="or-divider">
            <span>or</span>
          </div>

          {/* Google login */}
          <button type="button" className="google-btn">
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="google-icon"
            />
            Sign in with Google
          </button>
        </form>

        {/* Footer text */}
        <p className="footer-text">
          {activeTab === "login"
            ? "Don’t have an account? "
            : "Already have an account? "}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setActiveTab(activeTab === "login" ? "signup" : "login");
              setPassword("");
            }}
          >
            {activeTab === "login" ? "Sign up" : "Log in"}
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
