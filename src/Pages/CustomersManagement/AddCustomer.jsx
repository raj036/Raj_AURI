import React, { useEffect, useState } from "react";
import "./AddCustomer.css";
import Layout from "../../Components/Layout/Layout";
import PageHeader from "../../Components/PageHeader";
import { PrimaryButton, SecondaryButton } from "../../Components/Button";
import { InputField, SelectField } from "../../Components/FormField";
import { updateCustomers, addCustomers } from "../../Utils/apiServices.jsx";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";

const AddCustomer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const rowData = location.state?.rowData; // ✅ read properly

  const [customer, setCustomer] = useState({
    id: "",
    customerName: "",
    companyName: "",
    email: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    landmark: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
    tags: "",
    customerStatus: "",
    completionDate: "",
    createdAt: "",
    updatedAt: "",
    // alternativeNumber: "",
    // address: "",
    // locationLink: "",
    // companyType: "",
    // engagement: "",
    // leadId: "",
    // createdById: "",
    // CreatedDate: "",
    // leadName: "",
    // leadType: "",
    // lastModifiedById: "",
    // lastModifiedDate: "",
  });

  // ✅ Pre-fill if editing
  useEffect(() => {
    if (rowData) {
      setCustomer({
        id: rowData.id || "",
        customerName: rowData.customerName || "",
        companyName: rowData.companyName || "",
        email: rowData.email || "",
        phone: rowData.phone || "",
        addressLine1: rowData.addressLine1 || "",
        addressLine2: rowData.addressLine2 || "",
        landmark: rowData.landmark || "",
        city: rowData.city || "",
        state: rowData.state || "",
        country: rowData.country || "",
        pincode: rowData.pincode || "",
        tags: rowData.tags || "",
        customerStatus: rowData.customerStatus || "ACTIVE",
        completionDate: rowData.completionDate || "",
        createdAt: rowData.createdAt || "",
        updatedAt: rowData.updatedAt || "",
      });
    }
  }, [rowData]);

  const handleChange = (field, value) => {
    setCustomer((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
     // ✅ Validation
    if (!customer.customerName || !customer.email || !customer.phone) {
      return Swal.fire("Error", "Customer Name, Email, and Phone are required", "error");
    }

    // ✅ Prepare payload matching backend expectations
    const payload = {
      // Include id only when updating
      ...(rowData && { id: rowData.id }),
      customerName: customer.customerName.trim(),
      companyName: customer.companyName?.trim() || null,
      email: customer.email.trim(),
      phone: customer.phone.trim(),
      addressLine1: customer.addressLine1?.trim() || null,
      addressLine2: customer.addressLine2?.trim() || null,
      landmark: customer.landmark?.trim() || null,
      city: customer.city?.trim() || null,
      state: customer.state?.trim() || null,
      country: customer.country?.trim() || null,
      pincode: customer.pincode?.trim() || null,
      tags: customer.tags?.trim() || null,
      customerStatus: customer.customerStatus?.toUpperCase() || "ACTIVE",
      // Add products array if needed by backend
      products: []
    };

    console.log("💾 Customer Payload:", payload);

    try {
      // ✅ Both add and update use the same endpoint
      const response = await addCustomers(payload);
      
      Swal.fire(
        "Success", 
        rowData ? "Customer updated successfully!" : "Customer added successfully!", 
        "success"
      );
      
      setTimeout(() => {
        navigate("/customer-management");
      }, 1500);
    } catch (error) {
      console.error("Error saving customer:", error);
      Swal.fire("Error", "Failed to save customer", "error");
    }
  };

  return (
    <Layout>
      <div>
        <PageHeader
          title={rowData ? "Edit Customer Details" : "Add Customer Details"}
          subtitle={rowData ? "Update customer details" : "Add Customers Details"}
          breadcrumb={rowData ? "Edit Customer" : "Add Customers"}
          actions={
            <div className="actions">
              <SecondaryButton
                label="Cancel"
                onClick={() => navigate("/customer-management")}
              />
              <PrimaryButton
                label={rowData ? "Update" : "Save"}
                onClick={handleSave}
              />
            </div>
          }
        />
        <div className="product-form-card">
          <div className="product-form-grid">
            {/* <div className="upload-section">
              <p>Customer Details</p>
            </div> */}
            <div className="product-form-fields">
              <div className="form-row">
                <InputField
                  label="ID"
                  value={customer.id}
                  placeholder="300056"
                  onChange={(e) => handleChange("id", e.target.value)}
                />
                 <InputField
                  label="Company Name"
                  placeholder="ABC LTD"
                  value={customer.companyName}
                  onChange={(e) => handleChange("companyName", e.target.value)}
                />
                <InputField
                  label="Customer Name"
                  placeholder="Suraj Sharma"
                  value={customer.customerName}
                  onChange={(e) =>
                    handleChange("customerName", e.target.value)
                  }
                  />

                  <InputField
                  label="Email"
                  placeholder="surajsharma@gmail.com"
                  value={customer.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                />
                  <InputField
                  label="Phoner Number"
                  placeholder="+91 9876543210"
                  value={customer.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                />
                {/* <InputField
                  label="Lead Name"
                  placeholder="Suraj Sharma"
                  value={customer.leadName}
                  onChange={(e) => handleChange("leadName", e.target.value)}
                /> */}

                {/* <SelectField
                  label="Lead Type"
                  placeholder="Individual"
                  options={["Company", "Individual"]}
                  value={customer.leadType}
                  onChange={(e) => handleChange("leadType", e.target.value)}
                /> */}
               
              </div>
              <div className="form-row">
                
                <InputField
                  label="Address Line 1"
                  placeholder="45 MG Road"
                  value={customer.addressLine1}
                  onChange={(e) => handleChange("addressLine1", e.target.value)}
                />
                <InputField
                  label="Address Line 2"
                  placeholder="Near Central Mall"
                  value={customer.addressLine2}
                  onChange={(e) => handleChange("addressLine2", e.target.value)}
                />
                <InputField
                  label="Landmark"
                  placeholder="Central Mall"
                  value={customer.landmark}
                  onChange={(e) =>
                    handleChange("landmark", e.target.value)
                  }
                />
                <InputField
                  label="City"
                  placeholder="Mumbai"
                  value={customer.city}
                  onChange={(e) => handleChange("city", e.target.value)}
                />
              </div>
              <div className="form-row">
                <InputField
                  label="State"
                  placeholder="Maharashtra"
                  value={customer.state}
                  onChange={(e) => handleChange("state", e.target.value)}
                />
                <InputField
                  label="Country"
                  placeholder="India"
                  value={customer.country}
                  onChange={(e) => handleChange("country", e.target.value)}
                />
                <InputField
                  label="Pincode"
                  placeholder="411006"
                  value={customer.pincode}
                  onChange={(e) => handleChange("pincode", e.target.value)}
                />
                <SelectField
                  label="Tags"
                  placeholder="VIP"
                  options={["VIP", "Supplier", "Customers"]}
                  value={customer.tags}
                  onChange={(e) => handleChange("tags", e.target.value)}
                />
              </div>
              <div className="form-row">
                <SelectField
                  label="Customer Status"
                  placeholder="Active"
                  options={["ACTIVE", "INACTIVE"]}
                  value={customer.customerStatus}
                  onChange={(e) => handleChange("customerStatus", e.target.value)}
                />
                <InputField
                  label="Completion Date"
                  type="date"
                  // placeholder="Details"
                  value={customer.completionDate}
                  onChange={(e) => handleChange("completionDate", e.target.value)}
                />
                <InputField
                  label="Created At"
                  placeholder="0002"
                  disabled
                  value={customer.createdAt}
                  onChange={(e) => handleChange("createdAt", e.target.value)}
                />
                <InputField
                  label="Updated At"
                  placeholder="0008"
                  disabled
                  value={customer.updatedAt}
                  onChange={(e) => handleChange("updatedAt", e.target.value)}
                />
              </div>
              <div className="form-row">
                {/* <InputField
                  label="Created Date"
                  placeholder="10-10-2025"
                  value={customer.CreatedDate}
                  onChange={(e) => handleChange("CreatedDate", e.target.value)}
                />
                <InputField
                  label="Last Modified By ID"
                  placeholder="0008"
                  value={customer.lastModifiedById}
                  onChange={(e) =>
                    handleChange("lastModifiedById", e.target.value)
                  }
                />
                <InputField
                  label="Last Modified Date"
                  placeholder="10-10-2025"
                  value={customer.leadId}
                  onChange={(e) => handleChange("leadId", e.target.value)}
                /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AddCustomer;
