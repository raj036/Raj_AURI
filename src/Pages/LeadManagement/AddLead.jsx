import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // ✅ to get rowData
import PageHeader from "../../Components/PageHeader";
import { InputField, SelectField } from "../../Components/FormField";
import { PrimaryButton, SecondaryButton } from "../../Components/Button";
import "./AddLead.css";
import Layout from "../../Components/Layout/Layout";
import api from "../../Utils/api";
import EditableData from "../../Components/EditableData";
import Dots from "../../assets/dots-vertical.svg";
import Delete from "../../assets/trash-01.svg";
import Swal from "sweetalert2";
import { addCustomers, addLead } from "../../Utils/apiServices.jsx";

const AddLead = () => {
  const [showSnackbar, setShowSnackbar] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const rowData = location.state?.rowData; // ✅ data passed from table edit

  const columns = [
    { key: "ProductName", label: "Product Name", editable: true },
    { key: "SKU", label: "SKU", editable: true },
    { key: "QuantitiyOrdered", label: "Quantitiy Ordered", editable: true },
    { key: "UnitPrice", label: "Unit Price", editable: true },
    { key: "TaxAmt", label: "Tax %/Amt", editable: true },
    { key: "DiscountAmt", label: "Discount %/Amt", editable: true },
    { key: "TotalAmt", label: "Total Amount", editable: false },
    { key: "image", label: <img src={Dots} alt="" /> },
  ];

  const [data, setData] = useState([
    {
      id: 1,
      ProductName: "Indoor Pest Control Spray",
      Brand: "Pesto",
      SKU: "PROD-001",
      QuantitiyOrdered: "425",
      UnitPrice: "₹ 2500",
      TaxAmt: "18% (₹188)",
      DiscountAmt: "10% (₹200)",
      image: <img src={Delete} alt="" />,
    },
    {
      id: 2,
      ProductName: "Indoor Pest Control Spray",
      Brand: "Pesto",
      SKU: "PROD-002",
      QuantitiyOrdered: "200",
      UnitPrice: "₹ 1500",
      TaxAmt: "8% (₹120)",
      DiscountAmt: "5% (₹80)",
      image: <img src={Delete} alt="" />,
    },
  ]);

  const calculateTotal = (row) => {
    const qty = parseFloat(row.QuantitiyOrdered) || 0;
    const price = parseFloat(row.UnitPrice.replace(/[^0-9.]/g, "")) || 0;

    let baseTotal = qty * price;

    // --- Tax Handling ---
    let tax = 0;
    if (row.TaxAmt.includes("%")) {
      const percent = parseFloat(row.TaxAmt);
      tax = (baseTotal * percent) / 100;
    } else {
      const match = row.TaxAmt.match(/₹([\d,]+)/);
      tax = match ? parseFloat(match[1].replace(/,/g, "")) : 0;
    }

    // --- Discount Handling ---
    let discount = 0;
    if (row.DiscountAmt.includes("%")) {
      const percent = parseFloat(row.DiscountAmt);
      discount = (baseTotal * percent) / 100;
    } else {
      const match = row.DiscountAmt.match(/₹([\d,]+)/);
      discount = match ? parseFloat(match[1].replace(/,/g, "")) : 0;
    }

    const total = baseTotal + tax - discount;
    return total;
  };

  // Map total dynamically
  const dataWithTotal = data.map((row) => ({
    ...row,
    TotalAmt: `₹ ${calculateTotal(row).toLocaleString("en-IN")}`,
  }));

  // ✅ Form state
  const [formData, setFormData] = useState({
    id: "",
    leadName: "",
    companyName: "",
    email: "",
    phone: "",
    source: "",
    typeOfLead: "",
    leadStatus: "",
    engagementScore: "",
    remarks: "",
    createdAt: "",
    updatedAt: "",
    joinedDate: "",
  });

  // ✅ Prepopulate in edit mode
  useEffect(() => {
    if (rowData) {
      setFormData({
        id: rowData.id || "",
        leadName: rowData.leadName || "",
        companyName: rowData.companyName || "",
        email: rowData.email || "",
        source: rowData.source || "",
        typeOfLead: rowData.typeOfLead || "",
        leadStatus: rowData.leadStatus || "",
        engagementScore: rowData.engagementScore || "",
        remarks: rowData.remarks || "",
        createdAt: rowData.createdAt || "",
        updatedAt: rowData.updatedAt || "",
        joinedDate: rowData.joinedDate || "",
      });
    }
  }, [rowData]);

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleCancel = () => navigate("/lead-management");

  // const handleSave = () => {
  //   setShowSnackbar(true);
  //   setTimeout(() => {
  //     setShowSnackbar(false);
  //     navigate(-1);
  //   }, 3000); // hide after 3 seconds, then go back
  //   if (rowData) {
  //     console.log("Updating invoice:", formData);
  //     // 🔄 Call update API
  //   } else {
  //     console.log("Adding new invoice:", formData);
  //     // 🔄 Call create API
  //   }
  // };

  const handleSave = async () => {
    // ✅ Validation
    if (!formData.leadName || !formData.email || !formData.companyName) {
      return Swal.fire(
        "Error",
        "Customer Name, Email, and Phone are required",
        "error"
      );
    }

    // ✅ Prepare payload matching backend expectations
    const payload = {
      // Include id only when updating
      ...(rowData && { id: rowData.id }),
      leadName: formData.leadName.trim(),
      companyName: formData.companyName?.trim() || null,
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      source: formData.source?.trim() || null,
      typeOfLead: formData.typeOfLead?.trim() || null,

      engagementScore: formData.engagementScore?.trim() || null,
      remarks: formData.remarks?.trim() || null,

      leadStatus: formData.leadStatus?.toUpperCase() || "NEW",
      // Add products array if needed by backend
      products: [],
    };

    console.log("💾 Leads Payload:", payload);

    try {
      // ✅ Both add and update use the same endpoint
      const response = await addLead(payload);

      Swal.fire(
        "Success",
        rowData
          ? "Customer updated successfully!"
          : "Customer added successfully!",
        "success"
      );

      setTimeout(() => {
        navigate("/lead-management");
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
          title={rowData ? "Edit Lead Details" : "Add Lead Details"}
          subtitle={rowData ? "Update Lead details" : "Add Lead Details"}
          breadcrumb={["Lead"]}
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
              <p>Lead Details</p>
            </div> */}
            <div className="product-form-fields">
              <div className="form-row">
                <InputField
                  label="Lead Name"
                  placeholder="300056"
                  value={formData.leadName}
                  onChange={(e) => handleChange("leadName", e.target.value)}
                />
                <SelectField
                  label="Lead Type"
                  placeholder="300056"
                  options={["PRODUCT_INQUIRY", "SERVICE_INQUIRY"]}
                  value={formData.leadType}
                  onChange={(e) => handleChange("leadType", e.target.value)}
                />
                <InputField
                  label="ID"
                  placeholder="300056"
                  value={formData.id}
                  onChange={(e) => handleChange("id", e.target.value)}
                />
                <InputField
                  label="Email"
                  
                  placeholder="Call"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                />
              </div>

              <div className="form-row">
                <InputField
                  label="Phone"
                  placeholder="10-10-2025"
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                />
                <InputField
                  label="Source"
                  placeholder="Extra Remarks"
                  value={formData.source}
                  onChange={(e) => handleChange("source", e.target.value)}
                />

                <SelectField
                  label="Lead Status"
                  placeholder="10-10-2025"
                  options={["NEW", "CONTACTED", "QUALIFIED", "CONVERTED", "LOST"]}
                  value={formData.leadStatus}
                  onChange={(e) =>
                    handleChange("leadStatus", e.target.value)
                  }
                />
                <InputField
                  
                  label="Engagement Score"
                  placeholder="Pending"
                  value={formData.engagementScore}
                  onChange={(e) => handleChange("engagementScore", e.target.value)}
                />
              </div>
              <div className="form-row">
                <InputField
                  label="Remarks"
                  placeholder="Suraj Sharma"
                  value={formData.remarks}
                  onChange={(e) => handleChange("remarks", e.target.value)}
                />
                <InputField
                  label="Lead Status"
                  
                  placeholder="Suraj Sharma"
                  value={formData.createdAt}
                  onChange={(e) => handleChange("createdAt", e.target.value)}
                />
                <InputField
                  label="Interest Level"
                  placeholder="10-10-2025"
                  value={formData.updatedAt}
                  onChange={(e) => handleChange("updatedAt", e.target.value)}
                />
                {/* <SelectField
                  label="Lead Interest Item"
                  options={["Product", "Service"]}
                  placeholder="10-10-2025"
                  value={formData.leadinterestItem}
                  onChange={(e) =>
                    handleChange("leadinterestItem", e.target.value)
                  }
                /> */}
              </div>
              {/* <div className="form-row">
                <InputField
                  label="Remarks / Notes"
                  placeholder="11:00pm"
                  value={formData.remarks}
                  onChange={(e) => handleChange("remarks", e.target.value)}
                />
                <InputField
                  label="Created Date"
                  placeholder="11:00pm"
                  value={formData.createdDate}
                  onChange={(e) => handleChange("createdDate", e.target.value)}
                />
                <InputField
                  label="Updated Date"
                  placeholder="11:00pm"
                  value={formData.updatedDate}
                  onChange={(e) => handleChange("updatedDate", e.target.value)}
                />
                <InputField
                  label="Last Updated Date"
                  placeholder="11:00pm"
                  value={formData.lastUpdatedDate}
                  onChange={(e) =>
                    handleChange("lastUpdatedDate", e.target.value)
                  }
                />
              </div>
              <div className="form-row">
                <InputField
                  label="Attention Flag"
                  placeholder="11:00pm"
                  value={formData.attentionFlag}
                  onChange={(e) =>
                    handleChange("attentionFlag", e.target.value)
                  }
                />
              </div> */}
            </div>
          </div>

          {/* Editable Table */}
        </div>

        <div>
          <EditableData
            columns={columns}
            data={dataWithTotal}
            onChange={setData}
            showPagination={false}
          />
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

export default AddLead;
