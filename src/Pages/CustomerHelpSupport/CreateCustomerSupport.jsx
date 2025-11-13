import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // ✅ to get rowData
import PageHeader from "../../Components/PageHeader";
import { InputField, SelectField } from "../../Components/FormField";
import { PrimaryButton, SecondaryButton } from "../../Components/Button";
import "./CreateCustomerSupport.css";
import Layout from "../../Components/Layout/Layout";

const CreateCustomerSuppert = () => {
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
          title={rowData ? "Edit Leave" : "Add Leave"}
          subtitle={rowData ? "Update Support Ticket" : "Create Support Ticket"}
          breadcrumb={["Create Support Ticket"]}
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
              <p>Task Details</p>
            </div>
            <div className="product-form-fields">
              <div className="form-row">
                <InputField
                  label="Support ID"
                  placeholder="560096 (Auto)"
                  value={formData.invoiceid}
                  onChange={(e) => handleChange("invoiceid", e.target.value)}
                />
                <InputField
                  label="Technician Name"
                  placeholder="Jay Singh"
                  value={formData.customerid}
                  onChange={(e) => handleChange("customerid", e.target.value)}
                />
                <InputField
                  label="Location"
                  placeholder="Jp Nagar Banglore"
                  value={formData.orderid}
                  onChange={(e) => handleChange("orderid", e.target.value)}
                />
              </div>

              <div className="form-row">
                <InputField
                  label="Task Name"
                  placeholder="Indoor Pest Control Spray"
                  value={formData.invoicedate}
                  onChange={(e) => handleChange("invoicedate", e.target.value)}
                />
                <InputField
                  label="Customer Name"
                  placeholder="Vipul Sharma"
                  value={formData.duedate}
                  onChange={(e) => handleChange("duedate", e.target.value)}
                />
                <InputField
                  label="Email"
                  placeholder="suraj@gmail.com"
                  value={formData.duedate}
                  onChange={(e) => handleChange("duedate", e.target.value)}
                />
              </div>
              <div className="form-row">
                <InputField
                  label="Phone"
                  placeholder="+91 98657 76765"
                  value={formData.invoicedate}
                  onChange={(e) => handleChange("invoicedate", e.target.value)}
                />
                <SelectField
                  label="Priority"
                  placeholder="Low"
                  options={["Medium", "High", "Critical"]}
                  value={formData.duedate}
                  onChange={(e) => handleChange("duedate", e.target.value)}
                />
                <SelectField
                  label="Status"
                  placeholder="Open"
                  options={[
                    "InProgress",
                    "Resolved",
                    "Closed",
                  ]}
                  value={formData.duedate}
                  onChange={(e) => handleChange("duedate", e.target.value)}
                />
              </div>

              <div className="form-row">
                <InputField
                  label="Task Details"
                  placeholder="Indoor Pest Control Spray 
at home garden area with 
Chemecials and water."
                  value={formData.itemid}
                  onChange={(e) => handleChange("itemid", e.target.value)}
                />
                <InputField
                  label="Issue Description"
                  placeholder="Indoor Pest Control Spray 
at home garden area with 
Chemecials and water."
                  value={formData.quantity}
                  onChange={(e) => handleChange("quantity", e.target.value)}
                />
                <InputField
                  label="Service Location"
                  placeholder="Flat 301, Sunshine Apartments, HSR Layout, Sector 1Bangalore 560102"
                  value={formData.rate}
                  onChange={(e) => handleChange("rate", e.target.value)}
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

export default CreateCustomerSuppert;
