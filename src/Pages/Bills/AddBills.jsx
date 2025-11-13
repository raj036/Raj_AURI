import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Layout from "../../Components/Layout/Layout";
import PageHeader from "../../Components/PageHeader";
import { InputField, SelectField } from "../../Components/FormField";
import { PrimaryButton, SecondaryButton } from "../../Components/Button";
import "./AddBills.css";

const AddBills = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showSnackbar, setShowSnackbar] = useState(false);

  // If editing, rowData will be passed from Bills.jsx
  const rowData = location.state?.rowData;

  // Form state
  const [formData, setFormData] = useState({
    paymentid: "",
    vendorid: "",
    POSONumber: "",
    billdate: "",
    duedate: "",
    status: "",
    quantity: "",
    rate: "",
    tax: "",
    totalamount: "",
  });

  // Pre-fill when editing
  useEffect(() => {
    if (rowData) {
      setFormData({
        paymentid: rowData.paymentid || "",
        vendorid: rowData.vendorid || "",
        POSONumber: rowData.POSONumber || "",
        billdate: rowData.billdate || "",
        duedate: rowData.duedate || "",
        status: rowData.status || "",
        quantity: rowData.quantity || "",
        rate: rowData.rate || "",
        tax: rowData.tax || "",
        totalamount: rowData.totalamount || "",
      });
    }
  }, [rowData]);

  // Handle input changes
  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const handleSave = () => {
    setShowSnackbar(true);
    setTimeout(() => {
      setShowSnackbar(false);
      navigate(-1);
    }, 3000); // hide after 3 seconds, then go back
    if (rowData) {
      console.log("Updating Bill:", formData); // 🔄 Replace with API call
    } else {
      console.log("Adding Bill:", formData); // ➕ Replace with API call
    }
  };

  return (
    <Layout>
      <div>
        <PageHeader
          title={rowData ? "Edit Bill" : "Add Bill"}
          subtitle={rowData ? "Update Bill Entry" : "Add Bill Entry"}
          breadcrumb={["Bills", rowData ? "Edit Bill" : "Add Bill"]}
          actions={
            <>
              <SecondaryButton label="Cancel" onClick={handleCancel} />
              <PrimaryButton label="Save" onClick={handleSave} />
            </>
          }
        />

        <div className="product-form-card">
          {/* Bill Details */}
          <div className="product-form-grid">
            <div className="upload-section">
              <p>Bill Details</p>
            </div>
            <div className="product-form-fields">
              <div className="form-row">
                <InputField
                  label="Payment ID"
                  value={formData.paymentid}
                  onChange={(e) => handleChange("paymentid", e.target.value)}
                />
                <InputField
                  label="Vendor ID"
                  value={formData.vendorid}
                  onChange={(e) => handleChange("vendorid", e.target.value)}
                />
                <InputField
                  label="PO/SO Number"
                  value={formData.POSONumber}
                  onChange={(e) => handleChange("POSONumber", e.target.value)}
                />
              </div>
              <div className="form-row">
                <InputField
                  label="Bill Date"
                  value={formData.billdate}
                  onChange={(e) => handleChange("billdate", e.target.value)}
                />
                <InputField
                  label="Due Date"
                  value={formData.duedate}
                  onChange={(e) => handleChange("duedate", e.target.value)}
                />
                <SelectField
                  label="Status"
                  value={formData.status}
                  options={[
                    "Active",
                    "Draft",
                    "Inactive",
                    "Pending",
                    "Approved",
                    "Issued",
                    "Rejected",
                  ]}
                  onChange={(e) => handleChange("status", e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Other Details */}
          <hr
            style={{
              border: "none",
              borderTop: "1px solid #E9EAEB",
              marginTop: "50px",
            }}
          />
          <div className="product-form-grid" style={{ marginTop: "50px" }}>
            <div className="upload-section">
              <p>Other Details</p>
            </div>
            <div className="product-form-fields">
              <div className="form-row">
                <InputField
                  label="Quantity"
                  value={formData.quantity}
                  onChange={(e) => handleChange("quantity", e.target.value)}
                />
                <InputField
                  label="Rate"
                  value={formData.rate}
                  onChange={(e) => handleChange("rate", e.target.value)}
                />
                <InputField
                  label="Tax"
                  value={formData.tax}
                  onChange={(e) => handleChange("tax", e.target.value)}
                />
              </div>
              <div className="form-row">
                <InputField
                  label="Total Amount"
                  value={formData.totalamount}
                  onChange={(e) => handleChange("totalamount", e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
        {showSnackbar && (
          <div
            style={{
              position: "fixed",
              top: "50px",
              left: "50%",
              transform: "translateX(-50%)",
              backgroundColor: "#4BB543",
              color: "#fff",
              padding: "12px 24px",
              borderRadius: "8px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
              zIndex: 9999,
            }}
          >
            Bill Added Successfully
          </div>
        )}
      </div>
    </Layout>
  );
};

export default AddBills;
