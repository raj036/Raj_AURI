import React, { useRef, useState } from 'react';
import './UploadCard.css';
import { ReactComponent as UploadIcon } from '../assets/uploadicon.svg';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const UploadCard = () => {
  const fileInputRef = useRef(null);
  const [files, setFiles] = useState([]);

  const handleCardClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const newFiles = selectedFiles.map((file) => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: file.size,
      type: file.type,
      progress: 0,
    }));

    setFiles((prev) => [...prev, ...newFiles]);
    newFiles.forEach((fileObj) => simulateUpload(fileObj));
  };

  const simulateUpload = (fileObj) => {
    const interval = setInterval(() => {
      setFiles((prevFiles) =>
        prevFiles.map((f) =>
          f.id === fileObj.id
            ? { ...f, progress: Math.min(f.progress + 10, 100) }
            : f
        )
      );
      if (fileObj.progress >= 100) {
        clearInterval(interval);
      }
    }, 300);
  };

  const handleDelete = (id) => {
    setFiles((prev) => prev.filter((file) => file.id !== id));
  };

  const formatSize = (size) => `${Math.round(size / (1024 * 1024))} MB`;

  const getFileType = (type) => {
    if (type.includes('csv')) return 'CSV';
    if (type.includes('png')) return 'PNG';
    if (type.includes('jpeg') || type.includes('jpg')) return 'JPG';
    if (type.includes('pdf')) return 'PDF';
    return 'FILE';
  };

  return (
    <div className="upload-card-outer">
      <div className="upload-card-wrapper" onClick={handleCardClick}>
        <input
          type="file"
          ref={fileInputRef}
          accept=".csv,.png,.jpg,.jpeg,.pdf"
          multiple
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
        <div className="upload-card-content">
          <div className="upload-icon-wrapper">
            <UploadIcon className="upload-icon" />
          </div>
          <span className="upload-title">Click to upload</span>
          <small className="upload-subtext">
            or drag and drop<br />
            CSV, PDF, PNG, or JPG (max. 800×400px)
          </small>
        </div>
      </div>

      {files.length > 0 && (
        <div className="upload-list">
          {files.map((file) => (
            <div className="upload-item" key={file.id}>
              <div className="file-icon">{getFileType(file.type)}</div>
              <div className="file-details">
                <div className="file-name">{file.name}</div>
                <div className="file-meta">
                  {getFileType(file.type)} – {formatSize(file.size)} – Uploading…
                </div>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${file.progress}%` }}
                  />
                </div>
              </div>
              <div className="file-progress-text">{file.progress}%</div>
              <div className="file-delete" onClick={() => handleDelete(file.id)}>
                <DeleteOutlineIcon style={{ fontSize: '18px' }} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UploadCard;
