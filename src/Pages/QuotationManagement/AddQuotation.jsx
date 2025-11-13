import React, { useState, useEffect } from "react";
import "./AddQuotation.css";
import Layout from "../../Components/Layout/Layout";
import PageHeader from "../../Components/PageHeader";
import { PrimaryButton, SecondaryButton } from "../../Components/Button";
import { DateField, InputField, SelectField } from "../../Components/FormField";
import EditableData from "../../Components/EditableData";
import Dots from "../../assets/dots-vertical.svg";
import { useNavigate, useLocation } from "react-router-dom";
import { createQuotation, updateQuotation } from "../../Utils/apiServices";

const AddQuotation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const editData = location.state?.editData || null;
  const type = location.state?.type || editData?.type || "Product";

  // 🧾 Form fields mapped to backend keys
  const [quotation, setQuotation] = useState({
    quotationId: "",
    type: type,
    customerId: "",
    address: "",
    contactPerson: "",
    quotationDate: "",
    validityDate: "",
    paymentTerms: "",
    totalAmount: 0,
    status: "draft",
    notes: "",
    language: "en",
  });

  const [data, setData] = useState([]);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState("");

  // 🧠 Prefill in edit mode
  useEffect(() => {
    if (editData) {
      console.log("🟢 Editing existing quotation:", editData);
      setQuotation({
        quotationId: editData.quotationId || "",
        type: editData.type || "Product",
        customerId: editData.customerId || "",
        address: editData.address || "",
        contactPerson: editData.contactPerson || "",
        quotationDate: editData.quotationDate || "",
        validityDate: editData.validityDate || "",
        paymentTerms: editData.paymentTerms || "",
        totalAmount: editData.totalAmount || 0,
        status: editData.status || "draft",
        notes: editData.notes || "",
        language: editData.language || "en",
      });
    }
  }, [editData]);

  // 🧮 Calculate total
  const calculateTotal = (row) => {
    const qty = parseFloat(row.QuantitiyOrdered) || 0;
    const price = parseFloat(row.UnitPrice?.replace(/[^0-9.]/g, "")) || 0;
    let base = qty * price;

    let tax = 0;
    if (row.TaxAmt?.includes("%")) {
      const percent = parseFloat(row.TaxAmt);
      tax = (base * percent) / 100;
    }
    const total = base + tax;
    return total;
  };

  const dataWithTotal = data.map((row) => ({
    ...row,
    TotalAmt: `₹ ${calculateTotal(row).toLocaleString("en-IN")}`,
  }));

  // 🔹 Handle change
  const handleChange = (key, value) => {
    setQuotation((prev) => ({ ...prev, [key]: value }));
  };

  const handleCancel = () => navigate(-1);

  // 🔹 Handle Submit
  const handleSubmit = async () => {
    const calculatedTotal = data.reduce(
      (sum, row) => sum + calculateTotal(row),
      0
    );
    const totalAmount = calculatedTotal || Number(quotation.totalAmount);

    const payload = {
      ...quotation,
      totalAmount,
    };

    console.log("🟡 Submitting quotation:", payload);

    try {
      if (editData?.quotationId) {
        console.log("✏️ Update API called for ID:", editData.quotationId);
        const res = await updateQuotation(editData.quotationId, payload);
        console.log("✅ Update API Response:", res);
        setSnackbarMsg("Quotation Updated Successfully");
      } else {
        console.log("➕ Create API called");
        const res = await createQuotation(payload);
        console.log("✅ Create API Response:", res);
        setSnackbarMsg("Quotation Created Successfully");
      }

      setShowSnackbar(true);
      setTimeout(() => {
        setShowSnackbar(false);
        navigate("/Quotation-Management");
      }, 2000);
    } catch (err) {
      console.error("❌ Error saving quotation:", err);
      alert("Failed to save quotation. Check console for details.");
    }
  };

  const columns = [
    { key: "CustomerName", label: "Customer Name", editable: true },
    { key: "Type", label: "Type", editable: true },
    { key: "ProductName", label: "Product Name", editable: true },
    { key: "Frequency", label: "Frequency", editable: true },
    { key: "UnitPrice", label: "Unit Price", editable: true },
    { key: "TaxAmt", label: "Tax %/Amt", editable: true },
    { key: "TotalAmt", label: "Total Amount", editable: false },
    { key: "image", label: <img src={Dots} alt="" /> },
  ];

  return (
    <Layout>
      <div>
        <PageHeader
          title={editData ? "Edit Quotation" : "Add Quotation"}
          subtitle={editData ? "Update existing quotation" : "Add new quotation"}
          breadcrumb="Quotation Management"
          actions={
            <div className="actions">
              <SecondaryButton label="Cancel" onClick={handleCancel} />
              <PrimaryButton
                label={editData ? "Update Quotation" : "Save Quotation"}
                onClick={handleSubmit}
              />
            </div>
          }
        />

        <div className="purchase-orders-card">
          {/* 🧾 Form Fields */}
          <div className="purchase-orders-grid">
            <div className="product-form-fields">
              <div className="form-row">
                <InputField
                  label="Quotation ID"
                  placeholder="Auto-generated"
                  value={quotation.quotationId}
                  onChange={(e) => handleChange("quotationId", e.target.value)}
                />
                <SelectField
                  label="Quotation Type"
                  placeholder="Select Type"
                  options={["Standard", "Product", "Service"]}
                  value={quotation.type}
                  onChange={(e) => handleChange("type", e.target.value)}
                />
                <InputField
                  label="Customer ID"
                  placeholder="CUST-1001"
                  value={quotation.customerId}
                  onChange={(e) => handleChange("customerId", e.target.value)}
                />
                <InputField
                  label="Address"
                  placeholder="Enter address"
                  value={quotation.address}
                  onChange={(e) => handleChange("address", e.target.value)}
                />
              </div>

              <div className="form-row">
                <InputField
                  label="Contact Person"
                  placeholder="Raj Sharma"
                  value={quotation.contactPerson}
                  onChange={(e) => handleChange("contactPerson", e.target.value)}
                />
                <DateField
                  label="Quotation Date"
                  value={quotation.quotationDate}
                  onChange={(e) => handleChange("quotationDate", e.target.value)}
                />
                <DateField
                  label="Validity Date"
                  value={quotation.validityDate}
                  onChange={(e) => handleChange("validityDate", e.target.value)}
                />
                <SelectField
                  label="Payment Terms"
                  placeholder="Net 30 / Advance"
                  options={["Net 30", "Advance %", "Credit Terms"]}
                  value={quotation.paymentTerms}
                  onChange={(e) => handleChange("paymentTerms", e.target.value)}
                />
              </div>

              <div className="form-row">
                <SelectField
                  label="Status"
                  placeholder="Select Status"
                  options={["draft", "sent", "approved", "rejected"]}
                  value={quotation.status}
                  onChange={(e) => handleChange("status", e.target.value)}
                />
                <InputField
                  label="Notes"
                  placeholder="Enter notes"
                  value={quotation.notes}
                  onChange={(e) => handleChange("notes", e.target.value)}
                />
                <SelectField
                  label="Language"
                  placeholder="Select Language"
                  options={["en", "hi"]}
                  value={quotation.language}
                  onChange={(e) => handleChange("language", e.target.value)}
                />
              </div>

              <div className="form-row">
                <InputField
                  label="Total Amount"
                  placeholder="Enter Total Amount"
                  type="number"
                  value={quotation.totalAmount}
                  onChange={(e) => handleChange("totalAmount", e.target.value)}
                />
              </div>
            </div>
          </div>

          <hr style={{ border: "none", borderTop: "1px solid #E9EAEB" }} />

          {/* 🧮 Editable Table */}
          <EditableData
            columns={columns}
            data={dataWithTotal}
            onChange={setData}
            showPagination={false}
          />
        </div>

        {/* ✅ Snackbar */}
        {showSnackbar && (
          <div
            style={{
              position: "fixed",
              top: "60px",
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
            {snackbarMsg}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default AddQuotation;
