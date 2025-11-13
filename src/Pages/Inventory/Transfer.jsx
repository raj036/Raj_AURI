import React, { useState } from "react";
import "./Transfer.css";
import Avatar1 from "../Inventory/Avatar1.svg";
import Arrows from "../Inventory/arrows-down.svg";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const Transfer = ({ onClose, onSuccess }) => {
  const productData = {
    image: Avatar1,
    product: "Indoor Pest Control",
    brand: "Brand-Pesto",
    proid: "SKU: PROD-001",
    availableQty: 350,
  };

  const branches = ["PestGuard Solutions (HSR)", "Branch 2", "Branch 3"];
  const targetBranches = ["Apex Exterminators", "Branch 2", "Branch 3"];

  const [quantity, setQuantity] = useState("");
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");

  // local snackbar (used only if parent didn't provide onSuccess)
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleQuantityChange = (e) => {
    const value = e.target.value.replace(/\D/g, ""); // digits only
    setQuantity(value);

    if (Number(value) > productData.availableQty) {
      setError("You cannot transfer more than the available quantity.");
    } else {
      setError("");
    }
  };

  const handleReasonChange = (e) => setReason(e.target.value);

  const handleSendRequest = () => {
    if (!quantity || Number(quantity) > productData.availableQty) {
      setError("You cannot transfer more than the available quantity.");
      return;
    }
    if (!reason.trim()) {
      setError("Please provide a reason for the transfer.");
      return;
    }

    // If parent wants to handle success (recommended), call it.
    if (typeof onSuccess === "function") {
      onSuccess("Transfer Request Sent Successfully 🚀");
      return;
    }

    // Fallback: show local snackbar (works even inside overlays)
    setOpenSnackbar(true);
  };

  const handleSnackbarClose = (_, reason) => {
    if (reason === "clickaway") return;
    setOpenSnackbar(false);
  };

  return (
    <>
      <div className="tansfer-main">
        <div className="main-transfer-head-hero">
          {/* Product Info */}
          <div className="transfer-head-hero">
            <div className="avatar-text">
              <div className="transfer-image">
                <img src={productData.image} alt={productData.product} />
              </div>
              <div className="transfer-text">
                <div className="transfer-product">{productData.product}</div>
                <div className="transfer-brand">{productData.brand}</div>
                <div className="transfer-proid">{productData.proid}</div>
              </div>
            </div>
          </div>

          {/* Transfer Form */}
          <div className="transfer-hero">
            <label className="label1">Transfer From Branch <span style={{ color: "red" }}>*</span></label>
            <select className="select1">
              {branches.map((branch, idx) => (
                <option key={idx} value={branch}>
                  {branch}
                </option>
              ))}
            </select>

            <img src={Arrows} alt="Arrows" className="select-icon" />

            <label className="label2">Transfer To Branch <span style={{ color: "red" }}>*</span></label>
            <select className="select2">
              {targetBranches.map((branch, idx) => (
                <option key={idx} value={branch}>
                  {branch}
                </option>
              ))}
            </select>

            <label className="label3">Transfer Stock Quantity <span style={{ color: "red" }}>*</span></label>
            <input
              type="text"
              placeholder="254"
              className="quantity"
              value={quantity}
              onChange={handleQuantityChange}
            />

            <label className="label4">Reason <span style={{ color: "red" }}>*</span></label>
            <input
              type="text"
              placeholder="Require urgently for new customer"
              className="reason"
              value={reason}
              onChange={handleReasonChange}
            />

            {error && (
              <div
                style={{
                  color: "#F04438",
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 400,
                  fontSize: "14px",
                  marginTop: "8px",
                }}
              >
                {error}
              </div>
            )}
          </div>

          {/* Bottom Info */}
          <div className="transfer-bottom">
            <span className="avalable">
              Available Qty: {productData.availableQty}
            </span>
          </div>

          {/* Buttons */}
          <button className="cancel" onClick={onClose}>
            Cancel
          </button>
          <button
            className="send-req"
            onClick={handleSendRequest}
            disabled={!!error || !quantity || !reason.trim()}
          >
            Send Request
          </button>
        </div>
      </div>

      {/* Local Snackbar fallback (identical style to Inventory) */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        sx={{ top: "50px", zIndex: 99999 }} // ensure visible above overlays
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ width: "100%" }}
          variant="filled"
        >
          Transfer Request Sent Successfully 🚀
        </Alert>
      </Snackbar>
    </>
  );
};

export default Transfer;
