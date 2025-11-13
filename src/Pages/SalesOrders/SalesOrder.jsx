import React, { useState } from "react";
import "./SalesOrder.css";
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

const SalesOrder = () => {
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
          title="Sales Order"
          subtitle="Add Sale order entry"
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
              <p>Order Summary</p>
            </div>
            <div className="product-form-fields">
              <div className="form-row">
                <InputField
                  label="SO Number"
                  placeholder="SO-826847399 (auto fill)"
                />
                <InputField label="Customer Name" placeholder="Paw Chemical " />
                <InputField
                  label="Customer Contact Info"
                  placeholder="+91 98657 76765"
                />
              </div>
              <div className="form-row">
                <InputField label="Order Date" placeholder="03/06/25" />
                <InputField
                  label="Expected Delivery Date"
                  placeholder="03/06/25"
                />
                <SelectField
                  label="Created By"
                  required
                  placeholder="Suraj (auto fill)"
                  options={["Suraj (auto fill)", "Vishal"]}
                />
              </div>
              <div className="form-row">
                <SelectField
                  label="Status"
                  placeholder="Confirmed"
                  options={["Confirmed", "Pending"]}
                />
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
          <div className="custom-con">
            <div className="purchase-orders-grid">
              <div className="upload-section">
                <p>Coustomer Details</p>
              </div>
              <div className="product-form-fields">
                <div className="form-row">
                  <InputField
                    label="Billing Address"
                    placeholder="Flat 301, Sunshine Apartments, 27th Main HSR Layout, Sector 1"
                  />
                  <InputField
                    label="Shipping Address"
                    placeholder="Flat 301, Sunshine Apartments, 27th Main HSR Layout, Sector 1"
                  />
                  <InputField
                    label="Phone Number"
                    placeholder="+91 98657 76765"
                  />
                  <FormControl>
                    <FormLabel>Payment Terms</FormLabel>
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
                  <div className="custom-field">
                    <InputField label="Payment Terms" placeholder="90 Days" />
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
          </div>

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
        </div>
      </div>
    </Layout>
  );
};

export default SalesOrder;
