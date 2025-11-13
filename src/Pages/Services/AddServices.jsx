// AddServices.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import PageHeader from "../../Components/PageHeader";
import { InputField, SelectField } from "../../Components/FormField";
import { PrimaryButton, SecondaryButton } from "../../Components/Button";
import Layout from "../../Components/Layout/Layout";
import "./AddServices.css";
import api from "../../Utils/api.js";
import { addServices, updateServices } from "../../Utils/apiServices";
import UploadCard from "../../Components/UploadCard";

const AddServices = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const rowData = location.state?.rowData || null; // Existing service data for edit

  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({});

  // Form state
  const [formData, setFormData] = useState({
    serviceId: "",
    serviceName: "",
    serviceDescription: "",
    servicePrice: "",
    serviceStatus: "ACTIVE",
    serviceCategory: "RESIDENTIAL",
    createdAt: "",
    lastModifiedAt: "",
    createdBy: "",
    residential: "",
    commercial: "",
  });

  // Prepopulate form if editing
  useEffect(() => {
    if (rowData) {
      setFormData({
        serviceId: rowData.serviceId || "",
        serviceName: rowData.serviceName || "",
        serviceDescription: rowData.serviceDescription || "",
        servicePrice: rowData.servicePrice || "",
        serviceStatus: rowData.serviceStatus || "ACTIVE",
        serviceCategory: rowData.serviceCategory || "RESIDENTIAL",
        createdAt: rowData.createdAt || "",
        lastModifiedAt: rowData.lastmodified || "",
        createdBy: rowData.createdBy || "",
        residential: rowData.residential || "",
        commercial: rowData.commercial || "",
      });
    }
  }, [rowData]);

  const handleCancel = () => {
    navigate(-1);
  };

  // const validateForm = () => {
  //   const newErrors = {};

  //   if(!formData.serviceName.trim()){
  //     newErrors.serviceName = "Service Name is required";
  //   } else if (formData.serviceName.length < 6){
  //     newErrors.serviceName = "Service Name must be at least 6 characters";
  //   }

  //   if (!formData.serviceDescription.trim())
  //     newErrors.serviceDescription = "Description is required.";

  //   if (!formData.servicePrice)
  //     newErrors.servicePrice = "Service Price is required.";
  //   else if (isNaN(formData.servicePrice) || formData.servicePrice <= 0)
  //     newErrors.servicePrice = "Enter a valid positive price.";

  //   if (!formData.serviceStatus)
  //     newErrors.serviceStatus = "Status must be selected.";

  //   if (!formData.serviceCategory)
  //     newErrors.serviceCategory = "Category must be selected.";

  //   if (!formData.createdBy.trim())
  //     newErrors.createdBy = "Creator name is required.";

  //   if (!formData.residential.trim())
  //     newErrors.residential = "Residential rate is required.";

  //   if (!formData.commercial.trim())
  //     newErrors.commercial = "Commercial rate is required.";

  //    setErrors(newErrors);
  //   return Object.keys(newErrors).length === 0; // ✅ valid if no errors
  // }

  //Save / Update Services
   
  const validateField = (name, value) => {
    let message = "";

    switch (name) {
      case "serviceName":
        if (!value.trim()) message = "Service Name is required.";
        else if (value.length < 3)
          message = "Name must be at least 3 characters.";
        break;
      case "serviceDescription":
        if (!value.trim()) message = "Description is required.";
        break;
      case "servicePrice":
        if (!value) message = "Price is required.";
        else if (isNaN(value) || parseFloat(value) <= 0)
          message = "Enter a valid positive number.";
        break;
      case "serviceStatus":
        if (!value) message = "Status is required.";
        break;
      case "serviceId":
        if (!value) message = "Service Id is required.";
        break;
      case "serviceCategory":
        if (!value) message = "Category is required.";
        break;
      case "createdBy":
        if (!value.trim()) message = "Created By is required.";
        break;
      case "createdAt":
        if (!value.trim()) message = "Created At is required.";
        break;
      case "lastModifiedAt":
        if (!value.trim()) message = "Last Modified is required.";
        break;
      case "residential":
        if (!value.trim()) message = "Residential rate is required.";
        break;
      case "commercial":
        if (!value.trim()) message = "Commercial rate is required.";
        break;
      
      default:
        break;
    }

    return message;
  };

   // ✅ Handle input change + live validation
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Validate this field instantly
    const errorMessage = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: errorMessage }));
  };

  // ✅ Validate all before submit
  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSave = async () => {
    if (!validateForm()) {
      setSnackbarMessage("Please correct the highlighted errors.");
      setShowSnackbar(true);
      setTimeout(() => setShowSnackbar(false), 3000);
      return;
    }

    console.log("🔑 Token after API call:", localStorage.getItem("authToken"));
    const payload = {
      // serviceId: formData.serviceId || "",
      serviceName: formData.serviceName || "",
      serviceDescription: formData.serviceDescription || "",
      servicePrice: parseFloat(formData.servicePrice) || 0,
      serviceStatus: formData.serviceStatus || "",
      serviceCategory: formData.serviceCategory || "",
      // createdAt: formData.createdAt || "",
      // lastModifiedAt: formData.lastModifiedAt || "",
    };

    console.log("Service Payload", payload);

    try {
      setLoading(true);

      if (rowData) {
        //update existing service
        // await updateServices({ serviceId: rowData.serviceId, ...payload });
        await updateServices(formData.serviceId, payload);
        setSnackbarMessage("Service Updated Successfully");
      } else {
        //Add new service
        await addServices(payload);
        setSnackbarMessage("Service Added Successfully");
      }

      setShowSnackbar(true);
      setTimeout(() => {
        setShowSnackbar(false);
        navigate(-1);
      }, 3000);

      navigate("/services");
    } catch (error) {
      console.error("Error saving services: ", error.response?.data || error);
      setSnackbarMessage("Failed to save service. Try again.");
      setShowSnackbar(true);
      setTimeout(() => setShowSnackbar(false), 3000);
    } finally {
      setLoading(false);
    }

    console.log("Saving services:", formData);
  };

    const errorStyle = { color: "red", fontSize: "13px", marginTop: "4px" };

  // const handleSave = () => {
  //   setShowSnackbar(true);
  //   setTimeout(() => {
  //     setShowSnackbar(false);
  //     navigate(-1);
  //   }, 3000); // hide after 3 seconds, then go back
  //   if (rowData) {
  //     // Edit mode
  //     console.log("Updating Service:", formData);
  //     // Call your API to update service
  //   } else {
  //     // Add mode
  //     console.log("Adding Service:", formData);
  //     // Call your API to add service
  //   }

  //   setShowSnackbar(true);
  //   setTimeout(() => setShowSnackbar(false), 3000);
  // };

  return (
    <Layout>
      <div>
        <PageHeader
          title={rowData ? "Edit Service" : "Add Service"}
          subtitle={
            rowData ? "Edit service details" : "Add and manage your service"
          }
          breadcrumb={["Services"]}
          actions={
            <>
              <SecondaryButton label="Cancel" onClick={handleCancel} />
              <PrimaryButton
                label={rowData ? "Update Service" : "Add Service"}
                onClick={handleSave}
              />
            </>
          }
        />

        <div className="product-form-card">
          <div className="product-form-grid">
            <div className="upload-section">
              <div className="upload-row">
                <UploadCard />
              </div>
            </div>

            <div className="product-form-fields">
              <div className="form-row">
                <div style={{flex: 1}}>
                  <InputField
                  label="Service ID"
                  placeholder="10001 (Auto)"
                  required
                  value={formData.serviceId}
                  onChange={(e) =>
                    setFormData({ ...formData, serviceId: e.target.value })
                  }
                />
                {errors.serviceId && (
                    <div style={errorStyle}>{errors.serviceId}</div>
                  )}
                </div>
                {/* <InputField
                  label="Service Name"
                  placeholder="General Pest Control"
                  value={formData.serviceName}
                  onChange={(e) =>
                    setFormData({ ...formData, serviceName: e.target.value })
                  }
                /> */}

                <div style={{ flex: 1 }}>
                  <InputField
                    label="Service Name"
                    name="serviceName"
                    placeholder="General Pest Control"
                    value={formData.serviceName}
                    onChange={handleChange}
                  />
                  {errors.serviceName && (
                    <div style={errorStyle}>{errors.serviceName}</div>
                  )}
                </div>
                <div style={{ flex: 1 }}>
                  <InputField
                  type="text"
                    label="Description"
                    name="serviceDescription"
                    placeholder="Basic treatment for pests"
                    value={formData.serviceDescription}
                    onChange={handleChange}
                  />
                  {errors.serviceDescription && (
                    <div style={errorStyle}>{errors.serviceDescription}</div>
                  )}
                </div>
              </div>
              <div className="form-row">
                <div style={{ flex: 1 }}>
                  <InputField
                    label="Service Price"
                    name="servicePrice"
                    placeholder="₹1500"
                    value={formData.servicePrice}
                    onChange={handleChange}
                  />
                  {errors.servicePrice && (
                    <div style={errorStyle}>{errors.servicePrice}</div>
                  )}
                </div>

                <div style={{ flex: 1 }}>
                  <SelectField
                    label="Status"
                    name="serviceStatus"
                    placeholder="Select Status"
                    options={["ACTIVE", "INACTIVE"]}
                    value={formData.serviceStatus}
                    onChange={handleChange}
                  />
                  {errors.serviceStatus && (
                    <div style={errorStyle}>{errors.serviceStatus}</div>
                  )}
                </div>

                <div style={{ flex: 1 }}>
                  <SelectField
                    label="Category"
                    name="serviceCategory"
                    placeholder="Select Category"
                    options={["COMMERCIAL", "RESIDENTIAL"]}
                    value={formData.serviceCategory}
                    onChange={handleChange}
                  />
                  {errors.serviceCategory && (
                    <div style={errorStyle}>{errors.serviceCategory}</div>
                  )}
                </div>              </div>

              <div className="form-row">
                <div style={{flex: 1}}>
                  <InputField
                  label="Created At"
                  name="createdAt"
                  placeholder="25/08/2024"
                  value={formData.createdAt}
                  onChange={handleChange}
                />
                {errors.createdAt && (
                    <div style={errorStyle}>{errors.createdAt}</div>
                  )}
                </div>
                <div style={{flex: 1}}>
                  <InputField
                  label="Last Modified At"
                  name="lastModifiedAt"
                  placeholder="25/09/2024 (Auto)"
                  value={formData.lastModifiedAt}
                  onChange={handleChange}
                />
                {errors.lastModifiedAt && (
                    <div style={errorStyle}>{errors.lastModifiedAt}</div>
                  )}
                </div>
                <div style={{ flex: 1 }}>
                  <InputField
                    label="Created By"
                    name="createdBy"
                    placeholder="Raj Sharma"
                    value={formData.createdBy}
                    onChange={handleChange}
                  />
                  {errors.createdBy && (
                    <div style={errorStyle}>{errors.createdBy}</div>
                  )}
                </div>
              </div>
              <div className="form-row">
                <div style={{ flex: 1 }}>
                  <InputField
                    label="Residential Rate"
                    name="residential"
                    placeholder="Per 100 Sq. Ft."
                    value={formData.residential}
                    onChange={handleChange}
                  />
                  {errors.residential && (
                    <div style={errorStyle}>{errors.residential}</div>
                  )}
                </div>

                <div style={{ flex: 1 }}>
                  <InputField
                    label="Commercial Rate"
                    name="commercial"
                    placeholder="Per 100 Sq. Ft."
                    value={formData.commercial}
                    onChange={handleChange}
                  />
                  {errors.commercial && (
                    <div style={errorStyle}>{errors.commercial}</div>
                  )}
                </div>

                
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
            {rowData
              ? "Service Updated Successfully"
              : "Service Added Successfully"}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default AddServices;
