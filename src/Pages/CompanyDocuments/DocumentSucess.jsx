import React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import "./DocumentSucess.css";

const DocumentSuccess = () => {
  return (
    <div className="document-success-wrapper">
      <div className="document-success-card">
        <div className="success-icon-container">
          <CheckCircleIcon className="success-icon" />
        </div>
        <h2>Document Uploaded Successfully</h2>
        <p>
          Our team will verify your details and get back to you shortly <br />
          usually within 24 hours.
        </p>
      </div>
    </div>
  );
};

export default DocumentSuccess;
