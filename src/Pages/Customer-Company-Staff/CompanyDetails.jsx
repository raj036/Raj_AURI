import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Layout from "../../Components/Layout/Layout";
import PageHeader from "../../Components/PageHeader";
import { DateField, InputField, SelectField } from "../../Components/FormField";
import { PrimaryButton, SecondaryButton } from "../../Components/Button";
import "./CompanyDetails.css";
import UploadCard from "../../Components/UploadCard";

const CompanyDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showSnackbar, setShowSnackbar] = useState(false);

  // If editing, rowData will be passed from another component
  const rowData = location.state?.rowData;

  // ✅ Form state with field names matching labels
  const [formData, setFormData] = useState({
    companyid: "",
    companyname: "",
    contactperson: "",
    email: "",
    address: "",
    gstnumber: "",
    pannumber: "",
    licenseno: "",
    branches: "",
    technicians: "",
    assignedplan: "",
    startdate: "",
    enddate: "",
    status: "",
    admincomment: "",
  });

  // ✅ Pre-fill when editing
  useEffect(() => {
    if (rowData) {
      setFormData({
        companyid: rowData.companyid || "",
        companyname: rowData.companyname || "",
        contactperson: rowData.contactperson || "",
        email: rowData.email || "",
        address: rowData.address || "",
        gstnumber: rowData.gstnumber || "",
        pannumber: rowData.pannumber || "",
        licenseno: rowData.licenseno || "",
        branches: rowData.branches || "",
        technicians: rowData.technicians || "",
        assignedplan: rowData.assignedplan || "",
        startdate: rowData.startdate || "",
        enddate: rowData.enddate || "",
        status: rowData.status || "",
        admincomment: rowData.admincomment || "",
      });
    }
  }, [rowData]);

  // ✅ Handle input changes
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
    }, 3000);

    if (rowData) {
      console.log("Updating Company:", formData); // 🔄 Replace with API call
    } else {
      console.log("Adding Company:", formData); // ➕ Replace with API call
    }
  };

  return (
    <Layout>
      <div>
        <PageHeader
          title={rowData ? "Edit Company" : "Add Company"}
          subtitle={rowData ? "Update Company Entry" : "Add Company Entry"}
          breadcrumb={["Companies", rowData ? "Edit Company" : "Add Company"]}
          actions={
            <>
              <SecondaryButton label="Cancel" onClick={handleCancel} />
              <PrimaryButton label="Save" onClick={handleSave} />
            </>
          }
        />

        {/* ✅ Form Section */}
        <div className="company-form-card"   style={{
    backgroundColor: "#ffffff", // white background
    borderRadius: "12px",        // rounded corners
    padding: "24px",             // inner spacing
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)", // subtle shadow
    marginBottom: "24px"         // spacing from other elements
  }}>
          <div className="company-form-grid">
            <div className="company-form-fields">
              {/* --- Company Basic Info --- */}
              <div className="form-row">
                <InputField
                  label="Company ID"
                  value={formData.companyid}
                  onChange={(e) => handleChange("companyid", e.target.value)}
                />
                <InputField
                  label="Company Name"
                  value={formData.companyname}
                  onChange={(e) => handleChange("companyname", e.target.value)}
                />
                <InputField
                  label="Contact Person"
                  value={formData.contactperson}
                  onChange={(e) => handleChange("contactperson", e.target.value)}
                />
                <InputField
                  label="Email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                />
                <InputField
                  label="Address"
                  value={formData.address}
                  onChange={(e) => handleChange("address", e.target.value)}
                  style={{ width: "100%" }}
                />
              </div>

              {/* --- Upload Documents --- */}
              <div className="form-row">
                <div className="upload-section">
                  <p>Business Documents</p>
                  <div className="upload-row">
                    <UploadCard />
                    <UploadCard />
                    <UploadCard />
                    <UploadCard />
                  </div>
                </div>
              </div>

              {/* --- Company Identification --- */}
              <div className="form-row">
                <InputField
                  label="GST Number"
                  value={formData.gstnumber}
                  onChange={(e) => handleChange("gstnumber", e.target.value)}
                />
                <InputField
                  label="PAN Number"
                  value={formData.pannumber}
                  onChange={(e) => handleChange("pannumber", e.target.value)}
                />
                <InputField
                  label="License No"
                  value={formData.licenseno}
                  onChange={(e) => handleChange("licenseno", e.target.value)}
                />
              </div>

              {/* --- Company Details --- */}
              <div className="form-row">
                <InputField
                  label="Number of Branches"
                  value={formData.branches}
                  onChange={(e) => handleChange("branches", e.target.value)}
                />
                <InputField
                  label="Number of Technicians"
                  value={formData.technicians}
                  onChange={(e) => handleChange("technicians", e.target.value)}
                />
                <SelectField
                  label="Assigned Plan"
                  options={["Pro Plan", "Normal Plan"]}
                  value={formData.assignedplan}
                  onChange={(value) => handleChange("assignedplan", value)}
                />
              </div>

              {/* --- Subscription Info --- */}
              <div className="form-row">
                <DateField
                  label="Subscription Start Date"
                  value={formData.startdate}
                  onChange={(value) => handleChange("startdate", value)}
                />
                <DateField
                  label="Subscription End Date"
                  value={formData.enddate}
                  onChange={(value) => handleChange("enddate", value)}
                />
                <SelectField
                  label="Status"
                  options={["Active", "Inactive"]}
                  value={formData.status}
                  onChange={(value) => handleChange("status", value)}
                />
              </div>

              {/* --- Admin Comment --- */}
              <div className="form-row" style={{ width: "100%" }}>
                <InputField
                  label="Admin Comment"
                  value={formData.admincomment}
                  onChange={(e) => handleChange("admincomment", e.target.value)}
                  style={{ width: "100%" }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* ✅ Snackbar */}
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
            Company Data Added Successfully
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CompanyDetails;
