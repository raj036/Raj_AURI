import React from "react";
import "./PageHeader.css";
import HomeIcon from "@mui/icons-material/Home";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const PageHeader = ({
  type = "default",
  breadcrumb,
  title,
  subtitle,
  actions,
  product,
}) => {
  const renderHeader = () => {
    switch (type) {
      case "pdp":
        return (
          <div className="pdp-header">
            <div className="pdp-product-card">
              <img
                src={product?.image}
                alt={product?.title}
                className="pdp-product-image"
              />
              <div className="pdp-product-details">
                <h2 style={{ marginTop: "10px" }}>{product?.title}</h2>
                <p style={{ marginTop: "10px" }}>Price: ₹ {product?.price}</p>
                <p style={{ marginTop: "10px" }}>Brand: {product?.brand}</p>
                <p style={{ marginTop: "10px" }}>
                  SKU: {product?.sku} &nbsp; | &nbsp; HSN: {product?.hsn}
                </p>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="page-header">
            <div className="page-header-top">
              <div>
                <div className="breadcrumb" style={{marginTop:'-5px'}}>
                  <HomeIcon className="home-icon" fontSize="medium"  style={{marginTop:'-2px'}}/>{" "}
                  <NavigateNextIcon fontSize="small" className="next-icon" />
                  <p style={{marginTop:'5px'}}>
                  {breadcrumb}
                  </p>
                </div>
                <h2>{title}</h2>
                <p>{subtitle}</p>
              </div>
              {actions && <div className="page-header-actions">{actions}</div>}
            </div>
          </div>
        );
    }
  };

  return renderHeader();
};

export default PageHeader;
