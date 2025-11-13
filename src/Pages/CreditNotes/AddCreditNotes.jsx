import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import PageHeader from "../../Components/PageHeader";
import { InputField, SelectField } from "../../Components/FormField";
import { PrimaryButton, SecondaryButton } from "../../Components/Button";
import "./AddCreditNotes.css";
import Layout from "../../Components/Layout/Layout";

const AddCreditNotes = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const rowData = location.state?.rowData; // 👈 if editing

  // form state
  const [formData, setFormData] = useState({
    creditnoteid: "",
    invoiceid: "",
    customerid: "",
    creditamount: "",
    issuesdate: "",
    reason: "",
    status: "",
  });

  const [showSnackbar, setShowSnackbar] = useState(false);
  const [message, setMessage] = useState("");

  // Prepopulate when editing
  useEffect(() => {
    if (rowData) {
      setFormData({
        creditnoteid: rowData.creditnoteid || "",
        invoiceid: rowData.invoiceid || "",
        customerid: rowData.customerid || "",
        creditamount: rowData.creditamount || "",
        issuesdate: rowData.issuesdate || "",
        reason: rowData.reason || "",
        status: rowData.status || "",
      });
    }
  }, [rowData]);

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleCancel = () => navigate(-1);

  const handleSave = () => {
    console.log("Final Form Data:", formData);

    setMessage(
      rowData
        ? "Credit Note Updated Successfully"
        : "Credit Note Added Successfully"
    );
    setShowSnackbar(true);

    setTimeout(() => {
      setShowSnackbar(false);
      navigate(-1); // go back after snackbar
    }, 2000);
  };

  return (
    <Layout>
      <div>
        <PageHeader
          title={rowData ? "Edit Credit Note" : "Add Credit Note"}
          subtitle={
            rowData ? "Update credit note details" : "Add a new credit note"
          }
          breadcrumb={["Credit Notes"]}
          actions={
            <>
              <SecondaryButton label="Cancel" onClick={handleCancel} />
              <PrimaryButton
                label={rowData ? "Update" : "Save"}
                onClick={handleSave}
              />
            </>
          }
        />

        <div className="product-form-card">
          <div className="product-form-grid">
            <div className="upload-section">
              <p>Credit Note Details</p>
            </div>

            <div className="product-form-fields">
              <div className="form-row">
                <InputField
                  label="Credit Note ID"
                  value={formData.creditnoteid}
                  onChange={(e) => handleChange("creditnoteid", e.target.value)}
                  disabled={!!rowData} // disable in edit mode
                />
                <InputField
                  label="Invoice ID"
                  value={formData.invoiceid}
                  onChange={(e) => handleChange("invoiceid", e.target.value)}
                />
                <InputField
                  label="Customer ID"
                  value={formData.customerid}
                  onChange={(e) => handleChange("customerid", e.target.value)}
                />
              </div>

              <div className="form-row">
                <InputField
                  label="Credit Amount"
                  value={formData.creditamount}
                  onChange={(e) => handleChange("creditamount", e.target.value)}
                />
                <InputField
                  label="Issue Date"
                  value={formData.issuesdate}
                  onChange={(e) => handleChange("issuesdate", e.target.value)}
                />
                <SelectField
                  label="Reason"
                  options={[
                    "Return",
                    "Damaged goods",
                    "Wrong item delivered",
                    "Overpayment adjustment",
                    "Order cancelled",
                  ]}
                  value={formData.reason}
                  onChange={(e) => handleChange("reason", e.target.value)}
                />
              </div>

              <div className="form-row">
                <SelectField
                  label="Status"
                  options={[
                    "Issued",
                    "Pending",
                    "Approved",
                    "Rejected",
                    "Draft",
                  ]}
                  value={formData.status}
                  onChange={(e) => handleChange("status", e.target.value)}
                />
                <SelectField
                  label="Credit Note"
                  options={[
                    "30 Days",
                    "45 Days",
                    "90 Days",
                  ]}
                  value={formData.status}
                  onChange={(e) => handleChange("status", e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Snackbar */}
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
            {message}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default AddCreditNotes;
