import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // ✅ to get rowData
import PageHeader from "../../Components/PageHeader";
import { InputField, SelectField } from "../../Components/FormField";
import { PrimaryButton, SecondaryButton } from "../../Components/Button";
import "./AddJournalVoucher.css";
import Layout from "../../Components/Layout/Layout";

const AddJournalVoucher = () => {
  const [showSnackbar, setShowSnackbar] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const rowData = location.state?.rowData; // ✅ data passed from table edit

  // ✅ Form state
  const [formData, setFormData] = useState({
    invoiceid: "",
    customerid: "",
    orderid: "",
    invoicedate: "",
    duedate: "",
    itemid: "",
    quantity: "",
    rate: "",
    tax: "",
    totalamount: "",
    status: "",
  });

  // ✅ Prepopulate in edit mode
  useEffect(() => {
    if (rowData) {
      setFormData({
        invoiceid: rowData.invoiceid || "",
        customerid: rowData.customerid || "",
        orderid: rowData.orderid || "",
        invoicedate: rowData.invoicedate || "",
        duedate: rowData.duedate || "",
        itemid: rowData.invoiceitems || "", // map invoiceitems as itemid
        quantity: rowData.quantity || "",
        rate: rowData.rate || "",
        tax: rowData.tax || "",
        totalamount: rowData.totalamount || "",
        status: rowData.status || "",
      });
    }
  }, [rowData]);

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleCancel = () => navigate(-1);

  const handleSave = () => {
    setShowSnackbar(true);
    setTimeout(() => {
      setShowSnackbar(false);
      navigate(-1);
    }, 3000); // hide after 3 seconds, then go back
    if (rowData) {
      console.log("Updating invoice:", formData);
      // 🔄 Call update API
    } else {
      console.log("Adding new invoice:", formData);
      // 🔄 Call create API
    }
  };

  return (
    <Layout>
      <div>
        <PageHeader
          title={rowData ? "Edit Ledger" : "Add Ledger"}
          subtitle={
            rowData
              ? "Update Ledger details"
              : "Add edit and manage your Ledger "
          }
          breadcrumb={["Ledger"]}
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
          {/* Invoice Details */}
          <div className="product-form-grid">
            {/* <div className="upload-section">
              <p>User Details</p>
            </div> */}
            <div className="product-form-fields">
              <div className="form-row">
                <InputField
                  label="Date"
                  placeholder="10001"
                  value={formData.invoiceid}
                  onChange={(e) => handleChange("invoiceid", e.target.value)}
                />
                <SelectField
                  label="Narration"
                  placeholder="Asset"
                  options={["Liabilities"]}
                  value={formData.customerid}
                  onChange={(e) => handleChange("customerid", e.target.value)}
                />
                <SelectField
                  label="Journal Entries"
                  placeholder="Bank"
                  options={["Cash"]}
                  value={formData.orderid}
                  onChange={(e) => handleChange("orderid", e.target.value)}
                />
                <InputField
                  label="Account"
                  placeholder="+91 88765 23456"
                  value={formData.orderid}
                  onChange={(e) => handleChange("orderid", e.target.value)}
                />
              </div>

              <div className="form-row">
                <SelectField
                  label="Debit"
                  placeholder="Credit"
                  options={["Debit"]}
                  value={formData.invoicedate}
                  onChange={(e) => handleChange("invoicedate", e.target.value)}
                />
                <InputField
                  label="Credit"
                  placeholder="10001"
                  value={formData.duedate}
                  onChange={(e) => handleChange("duedate", e.target.value)}
                />
                <InputField
                  label="Account Subgroup"
                  placeholder="10001"
                  value={formData.duedate}
                  onChange={(e) => handleChange("duedate", e.target.value)}
                />
                    <InputField
                    label="Balance Type"
                    placeholder="10001"
                    value={formData.duedate}
                    onChange={(e) => handleChange("duedate", e.target.value)}
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
            Invoices Added Successfully
          </div>
        )}
      </div>
    </Layout>
  );
};

export default AddJournalVoucher;
