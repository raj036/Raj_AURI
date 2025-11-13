import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import Sidebar from "../../Components/Sidebar";
import "./CompanyInformation.css";
import { InputField, SelectField } from "../../Components/FormField";
import EditableData from "../../Components/EditableData";
import { useLocation, useNavigate } from "react-router-dom";
import {
  addCompanyInformation,
  updateCompanyInformation,
} from "../../Utils/apiServices";
import Swal from "sweetalert2";

const CompanyInformation = () => {
  const [showSnacker, setShowSnacker] = useState(false);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const rowData = location.state?.rowData;

  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    name: "",
    officeNo: "",
    addressLine1: "",
    addressLine2: "",
    description: "",
    gstNumber: "",
    panNumber: "",
    industryType: "",
    reviewComment: "",
    reviewStatus: "",
    contactPersonName: "",
    contactPersonEmail: "",
    contactPersonPhone: "",
    pincode: "",
    city: "",
    state: "",
    reviewedBy: "",
  });

  useEffect(() => {
    if (rowData) {
      setFormData({
        name: rowData.name || "",
        officeNo: rowData.officeNo || "",
        addressLine1: rowData.addressLine1 || "",
        addressLine2: rowData.addressLine2 || "",
        description: rowData.description || "",
        gstNumber: rowData.gstNumber || "",
        panNumber: rowData.panNumber || "",
        industryType: rowData.industryType || "",
        reviewStatus: rowData.reviewStatus || "APPROVED",
        reviewComment: rowData.reviewComment || "",
        contactPersonName: rowData.contactPersonName || "",
        contactPersonEmail: rowData.contactPersonEmail || "",
        contactPersonPhone: rowData.contactPersonPhone || "",
        pincode: rowData.pincode || "",
        city: rowData.city || "",
        state: rowData.state || "",
        reviewedBy: rowData.reviewedBy || "AdminUser",
      });
    }
  }, [rowData]);

  // Validation regex patterns
  const validationRules = {
    name: { required: true },
    industryType: { required: true },
    contactPersonName: { required: true },
    contactPersonEmail: {
      required: true,
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "Enter a valid email",
    },
    contactPersonPhone: {
      required: true,
      pattern: !/^\d{10}$/,
      message: "Enter valid 10-digit phone",
    },
    gstNumber: {
      required: true,
      pattern: /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
      message: "Invalid GST format (e.g. 22AAAAA0000A1Z5)",
    },
    panNumber: {
      required: true,
      pattern: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
      message: "Invalid PAN format (e.g. ABCDE1234F)",
    },
    pincode: {
      required: true,
      pattern: /^[1-9][0-9]{5}$/,
      message: "Enter valid 6-digit pincode",
    },
    officeNo: { required: true, pattern: !/^\d{6}$/, message: "Enter valid office number" },
    addressLine1: { required: true },
    addressLine2: { required: true },

    city: { required: true },
    state: { required: true },
  };

  // Validate one field at a time
  const validateField = (name, value) => {
    const rule = validationRules[name];
    if (!rule) return "";

    if (rule.required && !value.trim()) return "This field is required";
    if (rule.pattern && !rule.pattern.test(value))
      return rule.message || "Invalid value";
    return "";
  };

  // Validate all fields before submit
  const validateForm = () => {
    const newErrors = {};
    Object.keys(validationRules).forEach((key) => {
      const error = validateField(key, formData[key] || "");
      if (error) newErrors[key] = error;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field, value) => {
    if (field === "gstNumber" || field === "panNumber") {
      value = value.toUpperCase(); // force uppercase for GST & PAN
    }

    setFormData({ ...formData, [field]: value });

    // Live validation
    const errorMsg = validateField(field, value);
    setErrors((prev) => ({ ...prev, [field]: errorMsg }));
  };

  const handleCancel = () => navigate(-1);

  const handleSave = async () => {
    if (!validateForm()) {
      Swal.fire({
        icon: "warning",
        title: "Please correct the errors before saving",
      });
      return;
    }
    console.log("🟠 handleSave() triggered!");
    console.log("🔑 Token after API call:", localStorage.getItem("authToken"));
    const payload = {
      name: formData.name || "",
      officeNo: formData.officeNo || "",
      addressLine1: formData.addressLine1 || "",
      addressLine2: formData.addressLine2 || "",
      description: formData.description || "",
      gstNumber: formData.gstNumber || "",
      panNumber: formData.panNumber || "",
      industryType: formData.industryType || "",
      reviewStatus: formData.reviewStatus || "APPROVED",
      reviewComment: formData.reviewComment || "",
      contactPersonName: formData.contactPersonName || "",
      contactPersonEmail: formData.contactPersonEmail || "",
      contactPersonPhone: formData.contactPersonPhone || "",
      pincode: formData.pincode || "",
      city: formData.city || "",
      state: formData.state || "",
      reviewedBy: formData.reviewedBy || "AdminUser",
    };

    // try {
    //   setSaving(true);
    //   console.log("Payload to be sent:", payload);
    //   if (rowData) {
    //     //POST request
    //     await addCompanyInformation(payload);

    //     console.log("Company Information Added Successfully");
    //   }

    //   setShowSnacker(true);
    //   setTimeout(() => {
    //     setShowSnacker(false);
    //     navigate(-1);
    //   }, 3000);

    //   navigate("/Customer-Company-Staff");
    // } catch (error) {
    //   console.error("Error saving information: ", error);

    // } finally {
    //   setSaving(false);
    // }

    try {
      setSaving(true);
      console.log("📤 Sending payload:", JSON.stringify(payload, null, 2));

      if (rowData) {
        // 👇 UPDATE flow (PUT if your API supports)
        await updateCompanyInformation({ id: rowData.id, ...payload });
        console.log("✅ Company updated successfully");
      } else {
        // 👇 CREATE flow (POST)
        await addCompanyInformation(payload);
        console.log("✅ Company created successfully");
      }

      Swal.fire({
        icon: "success",
        title: rowData ? "Company Updated" : "Company Added",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate("/Customer-Company-Staff"); // or whatever your table route is
    } catch (error) {
      console.error("❌ Error saving company:", error.response?.data || error);
      Swal.fire({
        icon: "error",
        title: "Failed to save company",
        text: error.response?.data?.detail || error.message,
      });
    } finally {
      setSaving(false);
    }

    console.log("Saving Branch:", formData);
  };

  const errorStyle = { color: "red", fontSize: "13px", marginTop: "4px" };

  return (
    <div className="company-info-page">
      <Grid container spacing={3}>
        {/* Sidebar */}
        <Grid item xs={12} md={4}>
          <Sidebar />
        </Grid>

        {/* Main Content */}
        <Grid item xs={12} md={8}>
          <div className="company-info-content">
            <div className="product-form-card">
              <h2>Company Information</h2>
              <div className="product-form-fields">
                <div className="form-row">
                  <div style={{ flex: 1 }}>
                    <InputField
                      label="Company Name"
                      placeholder="Indo Pest PVT LTD"
                      value={formData.name}
                      // onChange={(e) => handleChange("name", e.target.value)}
                      onChange={(e) => handleChange("name", e.target.value)}
                    />
                    {errors.name && (
                      <span style={errorStyle}>{errors.name}</span>
                    )}
                  </div>
                  <div style={{ flex: 1 }}>
                    <SelectField
                      label="Industry Type"
                      options={["Grocery", "PestControl", "Clothing"]}
                      value={formData.industryType}
                      // onChange={(e) =>
                      //   handleChange("industryType", e.target.value)
                      // }
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          industryType: e.target.value,
                        })
                      }
                    />
                    {errors.industryType && (
                      <span style={errorStyle}>{errors.industryType}</span>
                    )}
                  </div>
                </div>

                <div className="form-row">
                  <div style={{ flex: 1 }}>
                    <InputField
                      label="Contact Person Name"
                      placeholder="Akash Shah"
                      value={formData.contactPersonName}
                      onChange={(e) =>
                        handleChange("contactPersonName", e.target.value)
                      }
                      // onChange={(e) =>
                      //   setFormData({
                      //     ...formData,
                      //     contactPersonName: e.target.value,
                      //   })
                      // }
                    />
                    {errors.contactPersonEmail && (
                      <span style={errorStyle}>
                        {errors.contactPersonEmail}
                      </span>
                    )}
                  </div>
                  <div style={{ flex: 1 }}>
                    <InputField
                      label="Contact Person Email"
                      placeholder="sanjayhah@narayana.com"
                      value={formData.contactPersonEmail}
                      onChange={(e) =>
                        handleChange("contactPersonEmail", e.target.value)
                      }
                      // onChange={(e) =>
                      //   setFormData({
                      //     ...formData,
                      //     contactPersonEmail: e.target.value,
                      //   })
                      // }
                    />
                    {errors.contactPersonEmail && (
                      <span style={errorStyle}>
                        {errors.contactPersonEmail}
                      </span>
                    )}
                  </div>
                  <div style={{ flex: 1 }}>
                    <InputField
                      label="Contact Person Phone"
                      placeholder="+91 98765 43210"
                      value={formData.contactPersonPhone}
                      onChange={(e) =>
                        handleChange("contactPersonPhone", e.target.value)
                      }
                      // onChange={(e) =>
                      //   setFormData({
                      //     ...formData,
                      //     contactPersonPhone: e.target.value,
                      //   })
                      // }
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div style={{ flex: 1 }}>
                    <InputField
                      label="GST Number"
                      placeholder="AGHT35425H"
                      value={formData.gstNumber}
                      onChange={(e) =>
                        handleChange("gstNumber", e.target.value)
                      }
                      // onChange={(e) =>
                      //   setFormData({ ...formData, gstNumber: e.target.value })
                      // }
                    />
                    {errors.gstNumber && (
                      <span style={errorStyle}>{errors.gstNumber}</span>
                    )}
                  </div>
                  <div style={{ flex: 1 }}>
                    <InputField
                      label="PAN Number"
                      placeholder="AGHA5654C"
                      value={formData.panNumber}
                      onChange={(e) =>
                        handleChange("panNumber", e.target.value)
                      }
                      // onChange={(e) =>
                      //   setFormData({ ...formData, panNumber: e.target.value })
                      // }
                    />
                    {errors.panNumber && (
                      <span style={errorStyle}>{errors.panNumber}</span>
                    )}
                  </div>
                </div>
                <div className="form-row">
                  <div style={{ flex: 1 }}>
                    <InputField
                      label="Office/Shop Number "
                      placeholder="1234/B"
                      value={formData.officeNo}
                      onChange={(e) => handleChange("officeNo", e.target.value)}
                      // onChange={(e) =>
                      //   setFormData({ ...formData, officeNo: e.target.value })
                      // }
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <InputField
                      label="Address Line 1"
                      placeholder="3rd Cross, 5th Main Road"
                      value={formData.addressLine1}
                      onChange={(e) =>
                        handleChange("addressLine1", e.target.value)
                      }
                      // onChange={(e) =>
                      //   setFormData({ ...formData, addressLine1: e.target.value })
                      // }
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <InputField
                      label="Address Line 2"
                      placeholder="JP Nagar, 7th Phase"
                      value={formData.addressLine2}
                      onChange={(e) =>
                        handleChange("addressLine2", e.target.value)
                      }
                      // onChange={(e) =>
                      //   setFormData({ ...formData, addressLine2: e.target.value })
                      // }
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div style={{ flex: 1 }}>
                    <InputField
                      label="Pincode"
                      placeholder="Indoor Pest Control Spray"
                      value={formData.pincode}
                      onChange={(e) => handleChange("pincode", e.target.value)}
                      // onChange={(e) =>
                      //   setFormData({ ...formData, pincode: e.target.value })
                      // }
                    />
                    {errors.pincode && (
                      <span style={errorStyle}>{errors.pincode}</span>
                    )}
                  </div>
                  <div style={{ flex: 1 }}>
                    <InputField
                      label="City"
                      placeholder="Bangalore"
                      value={formData.city}
                      onChange={(e) => handleChange("city", e.target.value)}
                      // onChange={(e) =>
                      //   setFormData({ ...formData, city: e.target.value })
                      // }
                    />
                    {errors.city && (
                      <span style={errorStyle}>{errors.city}</span>
                    )}
                  </div>
                  <div style={{ flex: 1 }}>
                    <InputField
                      label="State"
                      placeholder="Karnataka"
                      value={formData.state}
                      onChange={(e) => handleChange("state", e.target.value)}
                      // onChange={(e) =>
                      //   setFormData({ ...formData, state: e.target.value })
                      // }
                    />
                    {errors.state && (
                      <span style={errorStyle}>{errors.state}</span>
                    )}
                  </div>
                </div>
              </div>

              {showSnacker && (
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
                    ? "Information Updated Successfully"
                    : "Information Added Successfully"}
                </div>
              )}

              {/* Save and Continue Button */}
              <div className="save-button-container">
                <button className="save-button" onClick={handleSave}>
                  {rowData ? "Update Company" : "Save and Continue"}
                </button>
              </div>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default CompanyInformation;
