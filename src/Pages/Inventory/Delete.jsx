// import React, { useState } from "react";
// import "./Delete.css";
// import Deleteicon from "../Inventory/Featuredicon.svg";
// import Closeicon from "../Inventory/Buttonclose.svg";
// import Alert from "@mui/material/Alert";

// const Delete = ({ onClose, title = "Delete Admin", paragraph = "Are you sure you want to delete this branch? This action cannot be undone." }) => {
//   const [showToast, setShowToast] = useState(false);

//   const handleDelete = () => {
//     // Show toast
//     setShowToast(true);

//     // Auto hide after 3 seconds
//     setTimeout(() => {
//       setShowToast(false);
//       onClose();
//     }, 3000); // <-- Add 3000ms timeouts
//   };

//   return (
//     <>
//       <div className="delete-main">
//         <div className="delete-first">
//           <img className="delete-icon" src={Deleteicon} alt="delete-icon" />
//           <img
//             className="close-icon"
//             src={Closeicon}
//             alt="close-icon"
//             style={{ cursor: "pointer" }}
//             onClick={onClose}
//           />
//           <p className="delete-title">{title}</p>
//           <p className="delete-paragraph">{paragraph}</p>
//         </div>
//         <div className="delete-second">
//           <button className="cancel-btn" onClick={onClose}>
//             Cancel
//           </button>
//           <button className="delete-btn" onClick={handleDelete}>
//             Delete
//           </button>
//         </div>
//       </div>

//       {/* ✅ Floating Toast */}
//       {showToast && (
//         <div className="toast-wrapper">
//           <Alert severity="success" variant="filled">
//             Data deleted successfully
//           </Alert>
//         </div>
//       )}
//     </>
//   );
// };

// export default Delete;


import React, { useState } from "react";
import "./Delete.css";
import Deleteicon from "../Inventory/Featuredicon.svg";
import Closeicon from "../Inventory/Buttonclose.svg";
import Alert from "@mui/material/Alert";

const Delete = ({ onClose,onConfirm,  title = "Delete Admin", paragraph = "Are you sure you want to delete this branch? This action cannot be undone." }) => {
  const [showToast, setShowToast] = useState(false);

  const handleDelete = () => {
    // ✅ Call parent function first (this triggers API delete)
    if (onConfirm) onConfirm();

    // Show toast
    setShowToast(true);

    // Auto hide after 3 seconds
    setTimeout(() => {
      setShowToast(false);
      onClose();
    }, 3000);
  };

  return (
    <>
      <div className="delete-main">
        <div className="delete-first">
          <img className="delete-icon" src={Deleteicon} alt="delete-icon" />
          <img
            className="close-icon"
            src={Closeicon}
            alt="close-icon"
            style={{ cursor: "pointer" }}
            onClick={onClose}
          />
          <p className="delete-title">{title}</p>
          <p className="delete-paragraph">{paragraph}</p>
        </div>
        <div className="delete-second">
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button className="delete-btn" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>

      {/* ✅ Floating Toast */}
      {showToast && (
        <div className="toast-wrapper">
          <Alert severity="success" variant="filled">
            Data deleted successfully
          </Alert>
        </div>
      )}
    </>
  );
};

export default Delete;
