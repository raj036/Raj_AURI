import React, { useState } from "react";
import "./PurchaseOrders.css";
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
import Pagination from "../../Components/Pagination";
import Dots from "../../assets/dots-vertical.svg";
import Delete from "../../assets/trash-01.svg";
import { useNavigate } from "react-router-dom";

const PurchaseOrders = () => {
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
  return (
    <Layout>
      <div>
        <PageHeader
          title="Purchase Orders"
          subtitle="Add Purchase order entry"
          breadcrumb="Orders"
          actions={
            <div className="actions">
              <SecondaryButton label="Cancel PO" onClick={handleCancel} />
              <PrimaryButton label="+ Add PO" />
            </div>
          }
        />
        <div className="purchase-orders-card">
          <div className="purchase-orders-grid">
            <div className="upload-section">
              <p>Order Summary</p>
            </div>
            <div className="product-form-fields">
              <div className="form-row">
                <InputField
                  label="PO Number"
                  placeholder="PO-246647399 (auto fill)"
                />
                <InputField label="PO Date" placeholder="03/06/25" />
                <SelectField
                  label="Created By"
                  required
                  placeholder="Suraj"
                  options={["Suraj", "Unknown"]}
                />
              </div>
              <div className="form-row">
                <div className="cus-for">
                  <FormControl>
                    <FormLabel>Is Order received </FormLabel>
                    <RadioGroup fullwidth className="form-control">
                      <FormControlLabel
                        value="Yes"
                        control={<Radio />}
                        label="Yes"
                      />
                      <FormControlLabel
                        value="No"
                        control={<Radio />}
                        label="No"
                      />
                    </RadioGroup>
                  </FormControl>
                </div>
                <InputField
                  label="Expected Delivery Date"
                  placeholder="03/06/25"
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
          <div className="custom-con">
            <div className="purchase-orders-grid">
              <div className="upload-section">
                <p>Supplier Details</p>
              </div>
              <div className="product-form-fields">
                <div className="form-row">
                  <InputField
                    label="Supplier Name"
                    placeholder="Pesto PVT LTD"
                  />
                  <InputField label="Pesto PVT LTD" placeholder="Ajit Sharma" />
                  <InputField
                    label="Phone Number"
                    placeholder="+91 98657 76765"
                  />
                </div>
                <div className="form-row">
                  <InputField
                    label="Billing Address"
                    placeholder="Flat 301, Sunshine Apartments, 27th Main HSR Layout, Sector 1"
                  />
                  <InputField
                    label="Shipping Address"
                    placeholder="Flat 301, Sunshine Apartments, 27th Main HSR Layout, Sector 1"
                  />

                  <InputField label="Payment Terms" placeholder="90 Days" />
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
          <div>
            <EditableData
              columns={columns}
              data={dataWithTotal}
              onChange={setData}
              showPagination={true}
            />
          </div>
          <div className="custom-con">
            <div className="purchase-orders-grid">
              <div className="upload-section">
                <p>Summary Section</p>
              </div>
              <div className="product-form-fields">
                <div className="form-row">
                  <InputField label="Subtotal" placeholder="₹ 2,30,00" />
                  <InputField label="Taxes" placeholder="18%" />
                  <InputField label="Tax Amount" placeholder="1888" />
                  <InputField label="Total Amount" placeholder="₹ 2,50,00" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PurchaseOrders;
