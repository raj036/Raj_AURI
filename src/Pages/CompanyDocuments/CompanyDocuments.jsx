import React, { useState } from "react";
import DocumentRejected from "./DocumentsRejected";
import DocumentSucess from "./DocumentSucess"; // import here
import UploadCard from "../../Components/UploadCard";
import Sidebar from "../../Components/Sidebar";
import "./CompanyDocuments.css";
import { Grid } from "@mui/material";

const CompanyDocuments = () => {
  const [uploadState, setUploadState] = useState("form"); 
  // form | rejected | success

  const handleSubmit = () => {
    // simulate success after validation
    setUploadState("success");
  };

  const handleReupload = () => {
    setUploadState("form");
  };

  return (
    <div className="company-info-page">
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Sidebar />
        </Grid>

        <Grid item xs={12} md={8}>
          <div className="company-info-content">
            {uploadState === "form" && (
              <div className="product-form-card">
                <h2>Upload Documents</h2>

                <div className="form-row" style={{ marginTop: "60px" }}>
                  <div className="upload-section">
                    <p>GST Certificate</p>
                    <UploadCard />
                  </div>
                  <div className="upload-section">
                    <p>Pan Card</p>
                    <UploadCard />
                  </div>
                </div>

                <div className="form-row">
                  <div className="upload-section">
                    <p>Business Proof (License/Registration)</p>
                    <UploadCard />
                  </div>
                </div>

                <div className="save-button-container">
                  <button className="save-button" onClick={handleSubmit}>
                    Submit
                  </button>
                </div>
              </div>
            )}

            {uploadState === "rejected" && (
              <DocumentRejected onReupload={handleReupload} />
            )}

            {uploadState === "success" && <DocumentSucess />}
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default CompanyDocuments;
