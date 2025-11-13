import "./AddDeliveryChalan.css";
import PageHeader from "../../Components/PageHeader";
import UploadCard from "../../Components/UploadCard";
import { InputField, SelectField } from "../../Components/FormField";
import { PrimaryButton } from "../../Components/Button";
import Layout from "../../Components/Layout/Layout";
import EditableData from "../../Components/EditableData";
import { useState } from "react";
import Delete from "../../assets/trash-01.svg";
import Dots from "../../assets/dots-vertical.svg";

const AddDeliveryChalan = () => {
  const [data, setData] = useState([
    {
      id: 1,
      ProductName: "Indoor Pest Control Spray",
      Brand: "Pesto",
      SKU: "PROD-001",
      QuantitiyOrdered: "425",
      UnitPrice: "₹ 2500",
      TaxAmt: "18% (₹188)",
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
    const total = baseTotal + tax;
    return total;
  };

  // Map total dynamically
  const dataWithTotal = data.map((row) => ({
    ...row,
    TotalAmt: `₹ ${calculateTotal(row).toLocaleString("en-IN")}`,
  }));

  const columns = [
    { key: "ProductName", label: "Product Name", editable: true },
    { key: "SKU", label: "SKU", editable: true },
    { key: "QuantitiyOrdered", label: "Quantitiy Ordered", editable: true },
    { key: "UnitPrice", label: "Unit Price", editable: true },
    { key: "TaxAmt", label: "Tax %/Amt", editable: true },
    { key: "TotalAmt", label: "Total Amount", editable: false },
    { key: "image", label: <img src={Dots} alt="" /> },
  ];
  return (
    <Layout>
      <div>
        <PageHeader
          title="Add Delivery Challan"
          subtitle="Add edit Delivery Challan"
          breadcrumb={["Delivery Challan"]}
          actions={
            <>
              <PrimaryButton label="Add Challan" />
            </>
          }
        />
        <div className="product-form-card">
          <div className="product-form-grid">
            <div className="upload-section">
              <UploadCard />
            </div>

            <div className="product-form-fields">
              <div className="form-row">
                <InputField label="Challan ID" placeholder="764GH76" />
                <InputField label="Customer ID" placeholder="A-55541" />
                <InputField label="Delivery Date" placeholder="03/06/25" />
              </div>
              <div className="form-row">
                <InputField
                  label="Receivers Phone No"
                  placeholder="+91 98657 76765"
                />
                <SelectField
                  label="SKU Code"
                  placeholder="Signed"
                  option={["Signed", "Not Signed"]}
                />
              </div>
            </div>
          </div>
          <EditableData
            columns={columns}
            data={dataWithTotal}
            onChange={setData}
            showPagination={false}
          />
        </div>
      </div>
    </Layout>
  );
};

export default AddDeliveryChalan;
