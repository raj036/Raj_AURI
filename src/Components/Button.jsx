import React from "react";
import "./Button.css";

export const PrimaryButton = ({ label, onClick, type = "button" }) => {
  return (
    <button type={type} className="primary-button" onClick={onClick}>
       {label}
    </button>
  );
};

export const SecondaryButton = ({ label, onClick, type = "button" }) => {
  return (
    <button type={type} className="secondary-button" onClick={onClick}>
      {label}
    </button>
  );
};
