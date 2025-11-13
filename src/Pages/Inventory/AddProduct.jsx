import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import PageHeader from "../../Components/PageHeader";
import UploadCard from "../../Components/UploadCard";
import {
  InputField,
  SelectField,
  PriceField,
  DateField,
} from "../../Components/FormField";
import { PrimaryButton, SecondaryButton } from "../../Components/Button";
import "./AddProduct.css";
import Layout from "../../Components/Layout/Layout";
import { addProduct } from "../../Utils/apiServices"; 

const AddProductForm = () => {
  const navigate = useNavigate();

  // ✅ Initialize variants with all fields
  const [variants, setVariants] = useState([{
    id: Date.now(),
    itemQuantity: "",
    itemCost: "",
    purchasePrice: "",
    unitType: "",
    measurement: "",
    expireDate: ""
  }]);

  const [showSnackbar, setShowSnackbar] = useState(false);

  // ✅ Initialize product fields (removed duplicate itemQuantity + itemCost)
  const [formData, setFormData] = useState({
    itemName: "",
    itemDescription: "",
    categories: "",
    branchId: "1",
    applicableTaxNames: ["IGST"], 
    HSNCode: "",
    SKUCode: "",
    EAN: "",
    taxType: "",
    status: "",
  });

  // Handle product form input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle variant input
  const handleVariantChange = (variantId, field, value) => {
    setVariants((prevVariants) =>
      prevVariants.map((variant) =>
        variant.id === variantId ? { ...variant, [field]: value } : variant
      )
    );
  };

  // Add a new variant
  const addVariant = () => {
    setVariants([
      ...variants,
      {
        id: Date.now(),
        itemQuantity: "",
        itemCost: "",
        purchasePrice: "",
        unitType: "",
        measurement: "",
        expireDate: ""
      }
    ]);
  };

  const handleCancel = () => {
    navigate(-1); // go back
  };

const handleSave = async () => {
  // 🚨 Frontend validation
  for (let v of variants) {
    if (!v.itemQuantity || parseFloat(v.itemQuantity) < 1) {
      alert("Stock Quantity must be at least 1");
      return; // stop save
    }
  }

  const productData = {
    ...formData,
    categories: formData.categories,
    variants: variants.map(v => ({
      ...v,
      itemQuantity: parseFloat(v.itemQuantity), // no fallback to 0
      itemCost: parseFloat(v.itemCost) || 0,
      purchasePrice: parseFloat(v.purchasePrice) || 0,
    })),
  };

  try {
    const response = await addProduct(productData);
    if (response.status === 200) {
      setShowSnackbar(true);
      setTimeout(() => setShowSnackbar(false), 3000);
      navigate("/inventory");
    }
  } catch (error) {
    console.error("Error saving product", error);
  }
};


  return (
    <Layout>
      <div>
        <PageHeader
          title="Add Product"
          subtitle="Add, edit and manage your Products"
          breadcrumb={["Products"]}
          actions={
            <>
              <SecondaryButton label="Cancel" onClick={handleCancel} />
              <PrimaryButton label="Save" onClick={handleSave} />
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
                <InputField
                  label="Customer Name"
                  placeholder="Indoor Pest Control Spray"
                  name="itemName"
                  value={formData.itemName}
                  onChange={handleChange}
                />
                <InputField
                  label="Brand Name"
                  placeholder="Pesto"
                  name="itemDescription"
                  value={formData.itemDescription}
                  onChange={handleChange}
                />
                <SelectField
                  label="Category"
                  required
                  options={["Chemicals", "Equipment"]}
                  name="categories"
                  value={formData.categories}
                  onChange={handleChange}
                />
              </div>

              <div className="form-row">
                <InputField
                  label="HSN Code"
                  required
                  placeholder="#2366JHK657"
                  name="HSNCode"
                  value={formData.HSNCode}
                  onChange={handleChange}
                />
                <InputField
                  label="SKU Code"
                  placeholder="254-546-612"
                  name="SKUCode"
                  value={formData.SKUCode}
                  onChange={handleChange}
                />
                <InputField
                  label="EAN"
                  placeholder="8976JKL87782"
                  name="EAN"
                  value={formData.EAN}
                  onChange={handleChange}
                />
              </div>

              <div className="form-row checkbox-row">
                <label>
                  <input type="checkbox" /> Is Returnable
                </label>
              </div>

              <div className="form-row">
                <SelectField
                  label="Tax Type"
                  options={["Normal", "GST Exempted"]}
                  name="taxType"
                  value={formData.taxType}
                  onChange={handleChange}
                />
                <SelectField
                  label="Status"
                  required
                  options={["Active", "Inactive"]}
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                />
                <SelectField
                  label="Branch"
                  required
                  options={["HSR Layout", "Koramangala"]}
                  name="branchId"
                  value={formData.branchId}
                  onChange={handleChange}
                />
              </div>

              {/* ✅ Render variants dynamically */}
              {variants.map((variant) => (
                <div key={variant.id}>
                  <div className="form-row">
                 <InputField
  label="Stock Quantity"
  type="number"
  min="1"
  placeholder="254"
  value={variant.itemQuantity}
  onChange={(e) =>
    handleVariantChange(variant.id, "itemQuantity", e.target.value)
  }
/>
                    <PriceField
                      label="Selling Price"
                      value={variant.itemCost}
                      onChange={(e) =>
                        handleVariantChange(variant.id, "itemCost", e.target.value)
                      }
                    />
                    <PriceField
                      label="Purchase Price"
                      value={variant.purchasePrice}
                      onChange={(e) =>
                        handleVariantChange(variant.id, "purchasePrice", e.target.value)
                      }
                    />
                  </div>

                  <div className="form-row">
                    <SelectField
                      label="Unit Type"
                      options={["Pouch", "Bottle"]}
                      value={variant.unitType}
                      onChange={(e) =>
                        handleVariantChange(variant.id, "unitType", e.target.value)
                      }
                    />
                    <SelectField
                      label="Measurement"
                      options={["KG", "Litre"]}
                      value={variant.measurement}
                      onChange={(e) =>
                        handleVariantChange(variant.id, "measurement", e.target.value)
                      }
                    />
                    <DateField
                      label="Expire Date"
                      value={variant.expireDate}
                      onChange={(e) =>
                        handleVariantChange(variant.id, "expireDate", e.target.value)
                      }
                    />
                  </div>
                </div>
              ))}

              {/* Add Variant Button */}
              <div style={{ marginTop: "10px", display: "flex", justifyContent: "flex-end" }}>
                <SecondaryButton label="Add Variant" onClick={addVariant} />
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
            Product Added Successfully
          </div>
        )}
      </div>
    </Layout>
  );
};

export default AddProductForm;
