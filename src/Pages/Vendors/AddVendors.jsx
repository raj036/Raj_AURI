import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // react-router-dom v6
import PageHeader from "../../Components/PageHeader";
import { InputField, SelectField } from "../../Components/FormField";
import { PrimaryButton, SecondaryButton } from "../../Components/Button";
import "./AddVendors.css";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import Layout from "../../Components/Layout/Layout";

const AddVendors = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // If editing, rowData will be passed from Vendors page
  const editData = location.state?.rowData || null;

  const [formData, setFormData] = useState({
    vendorid: "",
    name: "",
    email: "",
    phone: "",
    status: "Active",
    address: "",
    paymentType: "", // COD, Prepaid, Credit
    paymentTerms: "",
  });

  const [showSnackbar, setShowSnackbar] = useState(false);

  // Pre-fill form if edit mode
  useEffect(() => {
    if (editData) {
      setFormData({
        vendorid: editData.vendorid || "",
        name: editData.name || "",
        email: editData.email || "",
        phone: editData.phone || "",
        status: editData.status || "Active",
        address: editData.address || "",
        paymentType: "", // if you want to map based on editData
        paymentTerms: editData.paymentterms || "",
      });
    }
  }, [editData]);

  const handleCancel = () => {
    navigate(-1); // go back one page
  };

  const handleSave = () => {
    setShowSnackbar(true);
    setTimeout(() => {
      setShowSnackbar(false);
      navigate(-1);
    }, 3000); // hide after 3 seconds, then go back
    if (editData) {
      console.log("Updating vendor:", formData);
      // call API to update vendor
    } else {
      console.log("Adding new vendor:", formData);
      // call API to add vendor
    }

    setShowSnackbar(true);
    setTimeout(() => setShowSnackbar(false), 3000); // hide after 3 seconds
  };

  return (
    <Layout>
      <div>
        <PageHeader
          title={editData ? "Edit Vendor" : "Add Vendor"}
          subtitle={
            editData ? "Update vendor details" : "Add a new vendor entry"
          }
          breadcrumb={[editData ? "Edit Vendor" : "Add Vendor"]}
          actions={
            <>
              <SecondaryButton label="Cancel" onClick={handleCancel} />
              <PrimaryButton
                label={editData ? "Update" : "Save"}
                onClick={handleSave}
              />
            </>
          }
        />

        <div className="product-form-card">
          {/* Vendor Details */}
          <div className="product-form-grid">
            <div className="upload-section">
              <p>Vendor Details</p>
            </div>
            <div className="product-form-fields">
              <div className="form-row">
                <InputField
                  label="Vendor ID"
                  placeholder="45466 (Auto)"
                  value={formData.vendorid}
                  onChange={(e) =>
                    setFormData({ ...formData, vendorid: e.target.value })
                  }
                />
                <InputField
                  label="Vendor Name"
                  placeholder="Vipul Sharma"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
                <InputField
                  label="Email"
                  placeholder="vipul@gmail.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
              <div className="form-row">
                <InputField
                  label="Phone"
                  placeholder="+91 98657 76765"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />
                <SelectField
                  label="Status"
                  options={["Active", "Draft", "Inactive"]}
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value })
                  }
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

          {/* Other Details */}
          <div className="product-form-grid" style={{ marginTop: "50px" }}>
            <div className="upload-section">
              <p>Other Details</p>
            </div>

            <div className="forinputfeildvendors">
              <InputField
                label="Billing Address"
                placeholder="Flat 301, Sunshine Apartments,
                             HSR Layout, Sector 1
                             Bangalore 560102"
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
              />

              <FormControl>
                <FormLabel style={{ color: "#374151" }}>Payment Type</FormLabel>
                <RadioGroup
                  value={formData.paymentType}
                  onChange={(e) =>
                    setFormData({ ...formData, paymentType: e.target.value })
                  }
                  className="form-control"
                >
                  <FormControlLabel
                    value="COD"
                    control={<Radio />}
                    label="COD"
                  />
                  <FormControlLabel
                    value="Prepaid"
                    control={<Radio />}
                    label="Prepaid"
                  />
                  <FormControlLabel
                    value="Credit"
                    control={<Radio />}
                    label="Credit"
                  />
                </RadioGroup>
              </FormControl>

              <div>
                <InputField
                  label="Payment Terms"
                  placeholder="30 Days"
                  value={formData.paymentTerms}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      paymentTerms: e.target.value,
                    })
                  }
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
            {editData
              ? "Vendor updated successfully"
              : "Vendor added successfully"}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default AddVendors;
