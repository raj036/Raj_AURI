import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // ✅ to get rowData
import PageHeader from "../../Components/PageHeader";
import { InputField, SelectField } from "../../Components/FormField";
import { PrimaryButton, SecondaryButton } from "../../Components/Button";
import "./AddInvoices.css";
import Layout from "../../Components/Layout/Layout";

const AddInvoices = () => {
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
          title={rowData ? "Edit Invoice" : "Add Invoice"}
          subtitle={rowData ? "Update invoice details" : "Add Invoice Entry"}
          breadcrumb={["Invoices"]}
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
            <div className="upload-section">
              <p>Invoice Details</p>
            </div>
            <div className="product-form-fields">
              <div className="form-row">
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
                <InputField
                  label="Order ID"
                  value={formData.orderid}
                  onChange={(e) => handleChange("orderid", e.target.value)}
                />
              </div>

              <div className="form-row">
                <InputField
                  label="Bill Date"
                  value={formData.invoicedate}
                  onChange={(e) => handleChange("invoicedate", e.target.value)}
                />
                <InputField
                  label="Due Date"
                  value={formData.duedate}
                  onChange={(e) => handleChange("duedate", e.target.value)}
                />
              </div>
            </div>
          </div>

          <hr
            style={{
              border: "none",
              borderTop: "1px solid #E9EAEB",
              marginTop: "50px",
            }}
          />

          {/* Invoice Items */}
          <div className="product-form-grid" style={{ marginTop: "50px" }}>
            <div className="upload-section">
              <p>Invoice Items</p>
            </div>
            <div className="product-form-fields">
              <div className="form-row">
                <InputField
                  label="Item ID"
                  value={formData.itemid}
                  onChange={(e) => handleChange("itemid", e.target.value)}
                />
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
              </div>

              <div className="form-row">
                <InputField
                  label="Tax"
                  value={formData.tax}
                  onChange={(e) => handleChange("tax", e.target.value)}
                />
                <InputField
                  label="Total Amount"
                  value={formData.totalamount}
                  onChange={(e) => handleChange("totalamount", e.target.value)}
                />
                <SelectField
                  label="Status"
                  value={formData.status}
                  options={["Pending", "Paid", "Overdue"]}
                  onChange={(e) => handleChange("status", e.target.value)}
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

export default AddInvoices;
