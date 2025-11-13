import React, { useState } from "react";
import { ReactComponent as BackgroundLines } from "../../assets/background.svg";

import { ReactComponent as LockIcon } from "../../assets/lock.svg";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import "./SetNewPassword.css";

const SetNewPassword = () => {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [success, setSuccess] = useState(false);

  const rules = [
    { label: "Must be at least 8 characters", test: (pw) => pw.length >= 8 },
    {
      label: "Must contain one special character",
      test: (pw) => /[!@#$%^&*(),.?":{}|<>]/.test(pw),
    },
  ];

  const rulesPassed = rules.every((rule) => rule.test(password));
  const confirmMatch = password && password === confirm;
  const allValid = rulesPassed && confirmMatch;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (allValid) {
      setSuccess(true);
    }
  };

  return (
    <div className="setpassword-container">
      <BackgroundLines className="background-lines" />
      <div className="setpassword-box">
        <div className="icon-wrapper">

        </div>

        {!success ? (
          <>
            <div className="lock-icon">
              <LockIcon fontSize="large" />
            </div>

            <h2 className="title">Set new password</h2>
            <p className="subtitle">
              Your new password must be different to previously used passwords.
            </p>

            <form className="setpassword-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  placeholder="Enter new password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Confirm password</label>
                <input
                  type="password"
                  placeholder="Re-enter password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                />
              </div>

              <ul className="password-rules">
                {rules.map((rule, i) => {
                  const passed = rule.test(password);
                  return (
                    <li key={i} className={passed ? "rule-passed" : "rule-failed"}>
                      {passed ? (
                        <CheckIcon className="rule-icon passed" />
                      ) : (
                        <CloseIcon className="rule-icon failed" />
                      )}
                      {rule.label}
                    </li>
                  );
                })}
                <li className={confirmMatch ? "rule-passed" : "rule-failed"}>
                  {confirmMatch ? (
                    <CheckIcon className="rule-icon passed" />
                  ) : (
                    <CloseIcon className="rule-icon failed" />
                  )}
                  Passwords must match
                </li>
              </ul>

              <button type="submit" className="reset-btn" disabled={!allValid}>
                Reset password
              </button>
            </form>

            <p className="footer-text">
              <a href="/login" className="back-link">
                ← Back to log in
              </a>
            </p>
          </>
        ) : (
          <div className="success-message">
            <div className="success-icon">
              <CheckIcon className="big-tick" />
            </div>
            <h2>Password Reset Successful</h2>
            <p>You can now log in with your new password.</p>
            <a href="/login" className="reset-btn">
              Back to Login
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default SetNewPassword;
