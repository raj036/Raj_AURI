import React, { useState } from "react";
import "./CreateInvoice.css";
import Layout from "../../Components/Layout/Layout";
import PageHeader from "../../Components/PageHeader";
import { PrimaryButton, SecondaryButton } from "../../Components/Button";
import { InputField, SelectField } from "../../Components/FormField";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import EditableData from "../../Components/EditableData";
import Dots from "../../assets/dots-vertical.svg";
import Delete from "../../assets/trash-01.svg";
import { useNavigate } from "react-router-dom";

const CreateInvoice = () => {
  const navigate = useNavigate();
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
  const handleCancel = () => {
    navigate(-1); // go back one page
  };

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

  // Summary Data
  const details = [
    { label: "Subtotal", value: "₹ 2,30,00" },
    { label: "Tax", value: "18%" },
    { label: "Tax Amount", value: "₹ 1888" },
    { label: "Additional Discounts", value: "₹ 500" },
    { label: "Shipping Charges", value: "₹ 1000" },
    { label: "Other Charges", value: "₹ 100" },
    { label: "Grand Total Amount", value: "₹ 2,50,000" },
  ];

  return (
    <Layout>
      <div>
        <PageHeader
          title="Create Invoices"
          subtitle="Create Invoice Entry"
          breadcrumb="Orders"
          actions={
            <div className="actions">
              <SecondaryButton label="Cancel PO" onClick={handleCancel} />
              <PrimaryButton label="+ Add PO" />
            </div>
          }
        />

        <div className="purchase-orders-card">
          {/* Order Summary */}
          <div className="purchase-orders-grid">
            <div className="upload-section">
              <p>Invoice Details</p>
            </div>
            <div className="product-form-fields">
              <div className="form-row">
                <SelectField
                  label="Customer Name"
                  placeholder="Vipul Sharma"
                  options={[
                    "Abhay Singh",
                    "Jenny agarval",
                    "Narine Ram",
                    "Kusum Jha",
                  ]}
                />
                <InputField label="Invoice No" placeholder="45466 (Auto)" />
                <InputField label="Invoice Date" placeholder="06/08/25" />
              </div>
              <div className="form-row">
                <InputField label="Due Date" placeholder="12/08/25" />
                <SelectField
                  label="Currency"
                  options={[
                    "Indian Rupee (₹)",
                    "Argentine Peso ($)",
                    "South African Rand (R)",
                    "Pound Sterling (£)",
                  ]}
                />
                <InputField
                  label="Reference No"
                  placeholder="TXN-5C6D8E9F-A1B2"
                />
              </div>
              <div className="form-row">
                <FormControl>
                  <FormLabel style={{ color: "#374151" }}>
                    Payment Type
                  </FormLabel>
                  <RadioGroup className="form-control">
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
                  />
                </div>
              </div>
            </div>
          </div>

          <hr
            style={{
              border: "none",
              borderTop: "1px solid #E9EAEB",
              marginTop: "20px",
            }}
          />

          {/* Customer Details */}

          {/* Editable Table */}
          <div>
            <EditableData
              columns={columns}
              data={dataWithTotal}
              onChange={setData}
              showPagination={false}
            />
          </div>
          <div>
            {/* Summary Section */}
            <div className="summary-box">
              <h3>Summary</h3>
              <table className="summary-table">
                <tbody>
                  {details.map((item, index) => (
                    <tr key={index}>
                      <td>{item.label}</td>
                      <td style={{ textAlign: "left" }}>{item.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <hr
            style={{
              border: "none",
              borderTop: "1px solid #E9EAEB",
              marginTop: "20px",
            }}
          />

          <div className="purchase-orders-grid">
            <div className="upload-section">
              <p>Notes</p>
            </div>
            <div className="product-form-fields">
              <div className="form-row">
                <InputField
                  label="Notes"
                  placeholder="I’ll make the full bill payment by 15th September as discussed. Please note it in your records and confirm once received.”"
                />
                <InputField
                  label="Terms & Conditions"
                  placeholder="Full payment is required upon receipt of invoice. Failure to pay on time may result in service suspension"
                />
                <InputField
                  label="Attachments"
                  placeholder="Full payment is required upon receipt of invoice. Failure to pay on time may result in service suspension"
                />
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateInvoice;
