import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PageHeader from "../../Components/PageHeader";
import { InputField, SelectField } from "../../Components/FormField";
import { PrimaryButton, SecondaryButton } from "../../Components/Button";
import "./AddSalesReturns.css";
import Layout from "../../Components/Layout/Layout";

const AddSalesReturns = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const rowData = location.state?.rowData; // 👈 Get row data if editing

  // Form state
  const [formData, setFormData] = useState({
    returnid: "",
    invoiceid: "",
    customerid: "",
    returndate: "",
    returnqty: "",
    returnedreason: "",
    refundamount: "",
    paymentmode: "",
  });

  const [showSnackbar, setShowSnackbar] = useState(false);
  const [message, setMessage] = useState("");

  // Prepopulate if editing
  useEffect(() => {
    if (rowData) {
      setFormData({
        returnid: rowData.returnid || "",
        invoiceid: rowData.invoiceid || "",
        customerid: rowData.customerid || "",
        returndate: rowData.returndate || "",
        returnqty: rowData.returnqty || "",
        returnedreason: rowData.returnedreason || "",
        refundamount: rowData.refundamount || "",
        paymentmode: rowData.paymentmode || "",
      });
    }
  }, [rowData]);

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleCancel = () => navigate(-1);

  const handleSave = () => {
    console.log("Final Form Data:", formData);

    setMessage(
      rowData
        ? "Sales Return Updated Successfully"
        : "Sales Return Added Successfully"
    );
    setShowSnackbar(true);

    setTimeout(() => {
      setShowSnackbar(false);
      navigate(-1); // go back only after snackbar shows
    }, 2000);
  };

  return (
    <Layout>
      <div>
        <PageHeader
          title={rowData ? "Edit Sales Return" : "Add Sales Return"}
          subtitle={
            rowData
              ? "Update existing sales return details"
              : "Add a new sales return entry"
          }
          breadcrumb={["Sales Returns"]}
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
          <div className="product-form-grid">
            <div className="upload-section">
              <p>Sales Returns Details</p>
            </div>

            <div className="product-form-fields">
              <div className="form-row">
                <InputField
                  label="Return ID"
                  value={formData.returnid}
                  onChange={(e) => handleChange("returnid", e.target.value)}
                  disabled={!!rowData} // read-only in edit mode
                />
                <InputField
                  label="Invoice ID"
                  value={formData.invoiceid}
                  onChange={(e) => handleChange("invoiceid", e.target.value)}
                />
                <InputField
                  label="Customer ID"
                  value={formData.customerid}
                  onChange={(e) => handleChange("customerid", e.target.value)}
                />
              </div>

              <div className="form-row">
                <InputField
                  label="Return Date"
                  value={formData.returndate}
                  onChange={(e) => handleChange("returndate", e.target.value)}
                />
                <SelectField
                  label="Payment Mode"
                  options={[
                    "Cash",
                    "UPI",
                    "Credit Card",
                    "Debit Card",
                    "Net Banking",
                    "Cheque",
                  ]}
                  value={formData.paymentmode}
                  onChange={(e) => handleChange("paymentmode", e.target.value)}
                />
                <InputField
                  label="Items Returned Qty"
                  value={formData.returnqty}
                  onChange={(e) => handleChange("returnqty", e.target.value)}
                />
              </div>

              <div className="form-row">
                <InputField
                  label="Returned Reason"
                  value={formData.returnedreason}
                  onChange={(e) =>
                    handleChange("returnedreason", e.target.value)
                  }
                />
                <InputField
                  label="Refund Amount"
                  value={formData.refundamount}
                  onChange={(e) => handleChange("refundamount", e.target.value)}
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
            {message}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default AddSalesReturns;
