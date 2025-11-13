import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // react-router-dom v6
import PageHeader from "../../Components/PageHeader";
import { InputField, SelectField } from "../../Components/FormField";
import { PrimaryButton, SecondaryButton } from "../../Components/Button";
import "./AddCustomers.css";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import Layout from "../../Components/Layout/Layout";

const AddVendor = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // If editing, rowData will be passed from Vendors page
  const editData = location.state?.rowData || null;

  const [formData, setFormData] = useState({
    vendorid: "",
    name: "",
    email: "",
    phone: "",
    currency: "Indian Rupee (₹)",
    creditlimit: "",
    gstin: "",
    address: "",
    paymentType: "", // COD, Prepaid, Credit
    paymentTerms: "",
    accountnumber: "",
    ifsccode: "",
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
        currency: editData.currency || "Indian Rupee (₹)",
        creditlimit: editData.creditlimit || "",
        gstin: editData.gstin || "",
        address: editData.address || "",
        paymentType: "", // if you want to map based on editData
        paymentTerms: editData.paymentterms || "",
        accountnumber: editData.accountnumber || "",
        ifsccode: editData.ifsccode || "",
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
          title={editData ? "Edit Vendors" : "Add Vendors"}
          subtitle={
            editData ? "Update Vendors details" : "Add Vendors entry"
          }
          breadcrumb={[editData ? "Edit Vendors" : "Add Vendors"]}
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
              <p>Vendors Details</p>
            </div>
            <div className="product-form-fields">
              <div className="form-row">
                
                <InputField
                  label="Customer Name"
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
                <InputField
                  label="Phone"
                  placeholder="+91 98657 76765"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />
              </div>
              <div className="form-row">
                <InputField
                label="GSTIN"
                placeholder="29ABCDE1234F1Z5"
                value={formData.gstin}
                onChange={(e) =>
                  setFormData({ ...formData, gstin: e.target.value })
                }
              />
                <SelectField
                  label="Currency"
                  options={["Indian Rupee (₹)", "Argentine Peso ($)", "South African Rand (R)", "Pound Sterling (£)"]}
                  value={formData.currency}
                  onChange={(e) =>
                    setFormData({ ...formData, currency: e.target.value })
                  }
                />
                <InputField
                  label="Credit Limit"
                  placeholder="₹4,00,000"
                  value={formData.creditlimit}
                  onChange={(e) =>
                    setFormData({ ...formData, creditlimit: e.target.value })
                  }
                />
              </div>
              <div className="form-row">
                <InputField
                label="Address"
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
                <SelectField
                  label="Payment Terms"
                  options={["30 Days", "60 Days"]}
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
              <p>Bank Details</p>
            </div>

            <div className="forinputfeildvendors">
              <InputField
                label="Account Number"
                placeholder="98765432109876"
                value={formData.accountnumber}
                onChange={(e) =>
                  setFormData({ ...formData, accountnumber: e.target.value })
                }
              />
              <InputField
                label="IFSC Code"
                placeholder="FAKE0123456"
                value={formData.ifsccode}
                onChange={(e) =>
                  setFormData({ ...formData, ifsccode: e.target.value })
                }
              />

              
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

export default AddVendor;
