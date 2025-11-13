import React from "react";
import "./DocumentsRejected.css";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import PictureAsPdfOutlinedIcon from "@mui/icons-material/PictureAsPdfOutlined";
import UploadFileOutlinedIcon from "@mui/icons-material/UploadFileOutlined";

const DocumentRejected = ({ onReupload }) => {
  return (
    <div className="document-rejected-container">
      <div className="document-rejected-card">
        {/* Header Section */}
        <div className="rejected-header">
          <ErrorOutlineIcon className="rejected-icon" />
          <div>
            <h2>Document Rejected</h2>
            <p>Your document could not be verified and has been rejected</p>
          </div>
        </div>

        {/* File Section */}
        <div className="rejected-file">
          <PictureAsPdfOutlinedIcon className="pdf-icon" />
          <div className="file-info">
            <p className="file-name">Business_License_2024.pdf</p>
            <span>
              Uploaded: October 5, 2025 &nbsp; | &nbsp; Rejected: October 7, 2025
            </span>
          </div>
        </div>

        <div className="rejected-file">
          <PictureAsPdfOutlinedIcon className="pdf-icon" />
          <div className="file-info">
            <p className="file-name">Business_License_2024.pdf</p>
            <span>
              Uploaded: October 5, 2025 &nbsp; | &nbsp; Rejected: October 7, 2025
            </span>
          </div>
        </div>

        {/* Rejection Reason */}
        <div className="rejection-reason">
          <strong>Reason for Rejection:</strong>
          <p>
            The document appears to be blurry and the text is not clearly readable. Please upload a
            high-resolution scan or photo where all text and details are clearly visible.
          </p>
        </div>

        {/* Upload Tips */}
        <div className="upload-tips">
          <strong>Tips for successful upload:</strong>
          <ul>
            <li>Ensure the document is clear and all text is readable</li>
            <li>Upload in high resolution</li>
            <li>Make sure all corners of the document are visible</li>
            <li>Avoid shadows on the document</li>
          </ul>
        </div>

        {/* Re-upload Button */}
        <div className="reupload-btn-container">
          <button className="reupload-btn" onClick={onReupload}>
            <UploadFileOutlinedIcon />
            Choose File to Re-upload Documents
          </button>
        </div>
      </div>
    </div>
  );
};

export default DocumentRejected;
