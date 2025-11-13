// AddUserForm.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // for navigation & state
import PageHeader from "../../Components/PageHeader";
import { InputField, SelectField } from "../../Components/FormField";
import { PrimaryButton, SecondaryButton } from "../../Components/Button";
import "./addUser.css";
import Layout from "../../Components/Layout/Layout";
import { addBranch, updateBranch } from "../../Utils/apiServices";

const AddUserForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const rowData = location.state?.rowData || null; // If editing, rowData will exist

  const [showSnackbar, setShowSnackbar] = useState(false);
  const [saving, setSaving] = useState(false);

  // ⚠️ Error state for each field
  const [errors, setErrors] = useState({});

  // Form state
  const [formData, setFormData] = useState({
    id: "",
    branchName: "",
    contactInfo: "",
    phoneNumber: "",
    branchStatus: "",
    branchType: "",
    editedBy: "",
    pincode: "",
    state: "",
    city: "",
    location: "",
  });

  // Prepopulate form if editing
  useEffect(() => {
    if (rowData) {
      // Parse location to get city and pincode
      // let city = "";
      // let pincode = "";
      // let state = ""; // Optional: set a default or parse if available

      // if (rowData.location) {
      //   const parts = rowData.location.split(",");
      //   const lastPart = parts[parts.length - 1].trim(); // e.g., "Bangalore 560102"
      //   const match = lastPart.match(/(\D+)\s(\d{6})$/); // captures city and pincode
      //   if (match) {
      //     city = match[1].trim();
      //     pincode = match[2];
      //   }
      //   // Optional: set state manually if not in location
      //   state = "Karnataka";
      // }

      setFormData({
        branchName: rowData.branchName || "",
        contactInfo: rowData.contactInfo?.email || "",
        phoneNumber: rowData.contactInfo?.phoneNumber || "",
        branchStatus: rowData.branchStatus || "",
        branchType: rowData.branchType || "",
        editedBy: rowData.lastEditedBy || "",
        location: rowData.location || "",
        city: rowData.city || "",
        pincode: rowData.pincode || "",
        state: rowData.state || "",
        id: rowData.id || "",
      });
    }
  }, [rowData]);

  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "branchName":
        if (!value.trim()) error = "Branch name is required.";
        break;

      case "contactInfo":
        if (!value.trim()) error = "Email is required.";
        else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value))
          error = "Enter a valid email address.";
        break;

      case "phoneNumber":
        if (!value.trim()) error = "Phone number is required.";
        else if (!/^\d{10}$/.test(value))
          error = "Phone number must be 10 digits.";
        break;

      case "pincode":
        if (!value.trim()) error = "Pincode is required.";
        else if (!/^\d{6}$/.test(value)) error = "Pincode must be 6 digits.";
        break;

      case "branchStatus":
        if (!value) error = "Please select branch status.";
        break;

      case "branchType":
        if (!value) error = "Please select branch type.";
        break;

      case "location":
        if (!value.trim()) error = "Location is required.";
        break;
      case "state":
        if (!value.trim()) error = "State is required.";
        break;
      case "city":
        if (!value.trim()) error = "City is required.";
        break;
      case "editedBy":
        if (!value.trim()) error = "Edited By is required.";
        break;

      default:
        break;
    }

    return error;
  };

  // 🧩 Pre-fill form if editing
  useEffect(() => {
    if (rowData) {
      const prefilled = {
        branchName: rowData.branchName || "",
        contactInfo: rowData.contactInfo?.email || "",
        phoneNumber: rowData.contactInfo?.phoneNumber || "",
        branchStatus: rowData.branchStatus || "",
        branchType: rowData.branchType || "",
        editedBy: rowData.lastEditedBy || "",
        location: rowData.location || "",
        city: rowData.city || "",
        pincode: rowData.pincode || "",
        state: rowData.state || "",
        id: rowData.id || "",
      };

      setFormData(prefilled);

      // ✅ Validate only empty fields on load
      const initialErrors = {};
      Object.keys(prefilled).forEach((key) => {
        if (!prefilled[key]) {
          const error = validateField(key, prefilled[key]);
          if (error) initialErrors[key] = error;
        }
      });
      setErrors(initialErrors);
    }
  }, [rowData]);

  // 🧠 Real-time validation on change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, value),
    }));
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

  const handleCancel = () => {
    navigate(-1); // go back one page
  };

  //Save(add or update)
  const handleSave = async () => {
    if (!validateForm()) return;
    console.log("🔑 Token after API call:", localStorage.getItem("authToken"));
    const payload = {
      branchName: formData.branchName,
      contactInfo: formData.contactInfo,
      phoneNumber: formData.phoneNumber,
      branchStatus: formData.branchStatus,
      branchType: formData.branchType,
      pincode: formData.pincode,
      city: formData.city,
      state: formData.state,
      location: formData.location,
      id: formData.id,
    };

    console.log("Payload", payload);

    try {
      console.log("Payload to be sent:", payload);
      setSaving(true);

      if (rowData) {
        //update existing branch
        await updateBranch(rowData.id, payload);
        console.log("Branch Updated Successfully");
      } else {
        //Add new branch
        await addBranch(payload);
        console.log("Branch Added Successfully");
      }

      setShowSnackbar(true);
      setTimeout(() => {
        setShowSnackbar(false);
        navigate(-1);
      }, 3000);
    } catch (error) {
      console.error("Error saving branch:", error);
    } finally {
      setSaving(false);
    }

    console.log("Saving Branch:", formData);
  };

  const errorStyle = { color: "red", fontSize: "13px", marginTop: "4px" };

  // const handleSave = () => {
  //   setShowSnackbar(true);
  //   setTimeout(() => {
  //     setShowSnackbar(false);
  //     navigate(-1);
  //   }, 3000);
  //   if (rowData) {
  //     console.log("Updating Branch:", formData);
  //     // Call update API here
  //   } else {
  //     console.log("Adding Branch:", formData);
  //     // Call add API here
  //   }
  // };

  return (
    <Layout>
      <div>
        <PageHeader
          title={rowData ? "Edit Branch" : "Add Branch"}
          subtitle={rowData ? "Edit branch details" : "Add branch details"}
          breadcrumb={["Branch Management"]}
          actions={
            <>
              <SecondaryButton label="Cancel" onClick={handleCancel} />
              <PrimaryButton
                label={saving ? "Saving..." : "Save"}
                onClick={handleSave}
                disabled={saving}
              />
            </>
          }
        />

        <div className="product-form-card">
          <div className="product-form-grid">
            <div className="product-form-fields">
              <div className="form-row">
                <div style={{ flex: 1 }}>
                  <InputField
                    label="Branch Name"
                    name="branchName"
                    required
                    value={formData.branchName}
                    // onChange={(e) =>
                    //   setFormData({ ...formData, branchName: e.target.value })
                    // }
                    onChange={handleChange}
                  />
                  {errors.branchName && (
                    <span style={errorStyle}>{errors.branchName}</span>
                  )}
                </div>
                <div style={{ flex: 1 }}>
                  <InputField
                    label="Email"
                    name="contactInfo"
                    required
                    value={formData.contactInfo}
                    onChange={handleChange}
                  />
                  {errors.contactInfo && (
                    <span style={errorStyle}>{errors.contactInfo}</span>
                  )}
                </div>
                <div style={{ flex: 1 }}>
                  <InputField
                    name="phoneNumber"
                    label="Phone Number"
                    value={formData.phoneNumber}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, ""); // remove non-digits
                      handleChange({ target: { name: "phoneNumber", value } });
                    }}
                  />
                  {errors.phoneNumber && (
                    <span style={errorStyle}>{errors.phoneNumber}</span>
                  )}
                </div>
              </div>

              <div className="form-row">
                <div style={{ flex: 1 }}>
                  <SelectField
                    label="Status"
                    name="branchStatus"
                    options={["ACTIVE", "INACTIVE"]}
                    value={formData.branchStatus}
                    onChange={handleChange}
                  />
                  {errors.branchStatus && (
                    <span style={errorStyle}>{errors.branchStatus}</span>
                  )}
                </div>
                <div style={{ flex: 1 }}>
                  <SelectField
                    label="Branch Type"
                    name="branchType"
                    options={["RETAIL", "SERVICE", "STORAGE_UNIT"]}
                    value={formData.branchType}
                    onChange={handleChange}
                  />
                  {errors.branchType && (
                    <span style={errorStyle}>{errors.branchType}</span>
                  )}
                </div>
                <div style={{ flex: 1 }}>
                  <InputField
                    label="Edited by"
                    name="editedBy"
                    value={formData.editedBy}
                    onChange={handleChange}
                  />
                  {errors.editedBy && (
                    <span style={errorStyle}>{errors.editedBy}</span>
                  )}
                </div>
              </div>

              <hr
                style={{
                  border: "none",
                  borderTop: "1px solid #E9EAEB",
                  margin: "16px 0",
                }}
              />

              <div className="form-row">
                <div style={{ flex: 1 }}>
                  <InputField
                    label="Pincode"
                    name="pincode"
                    required
                    value={formData.pincode}
                    onChange={handleChange}
                  />
                  {errors.pincode && (
                    <span style={errorStyle}>{errors.pincode}</span>
                  )}
                </div>
                <div style={{ flex: 1 }}>
                  <InputField
                    label="State"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                  />
                  {errors.state && (
                    <span style={errorStyle}>{errors.state}</span>
                  )}
                </div>
                <div style={{ flex: 1 }}>
                  <InputField
                    label="City"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                  />
                  {errors.city && <span style={errorStyle}>{errors.city}</span>}
                </div>
                <div style={{ flex: 1 }}>
                  <InputField
                    label="Location"
                    name="location"
                    required
                    value={formData.location}
                    onChange={handleChange}
                  />
                  {errors.location && (
                    <span style={errorStyle}>{errors.location}</span>
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
              ? "Branch Updated Successfully"
              : "Branch Added Successfully"}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default AddUserForm;
