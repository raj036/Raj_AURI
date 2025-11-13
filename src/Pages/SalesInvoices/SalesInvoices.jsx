import React from "react";
import "./Invoices.css";
import { ReactComponent as Logo } from "../../assets/Logomark.svg";

const SalesInvoices = () => {
  return (
    <div className="invoice-container">
      {/* ---------- HEADER WITH LOGO AND TITLE ---------- */}
      <div className="invoice-top">
      <div className="invoice-logo">
  <Logo className="company-logo" />
</div>
        <h1 className="invoice-title">Sales Invoice</h1>
      </div>

      {/* ---------- COMPANY / INVOICE / SHIP SECTIONS ---------- */}
      <header className="invoice-header">
        <div className="company-details">
          <h2>Company Details</h2>
          <p><strong>ERP AuriFlex</strong></p>
          <p>Flat 301, Sunshine Apartments,<br />27th Main HSR Layout, Sector 1</p>
          <p>+91 98722 76765</p>
        </div>

        <div className="invoice-details">
          <h2>Invoice Details</h2>
          <p><strong>Invoice No:</strong> SO-826847399</p>
          <p><strong>Date:</strong> 03/06/2025</p>
          <p><strong>Expected Delivery Date:</strong> 07/06/2025</p>
        </div>

        <div className="ship-to">
          <h2>Ship To</h2>
          <p><strong>Paw Chemical</strong></p>
          <p>Flat 546, Madhusudan Apartments,<br />27th Main HSR Layout, Sector 1</p>
          <p>+91 87624 65356</p>
        </div>
      </header>

      {/* ---------- TABLE ---------- */}
      <section className="product-table">
        <table>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>SKU</th>
              <th>Qty</th>
              <th>Unit Price</th>
              <th>Tax % / Amt</th>
              <th>Discount % / Amt</th>
              <th>Total Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Indoor Pest Control Spray (Brand: Pesto)</td>
              <td>PROD-001</td>
              <td>425</td>
              <td>₹2500</td>
              <td>18% (₹188)</td>
              <td>10% (₹2000)</td>
              <td>₹2,50,000</td>
            </tr>
            <tr>
              <td>Indoor Home Washing Spray (Brand: Zuketo)</td>
              <td>PROD-55467</td>
              <td>200</td>
              <td>₹1500</td>
              <td>8% (₹18)</td>
              <td>5% (₹105)</td>
              <td>₹1,50,000</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* ---------- ORDER SUMMARY ---------- */}
      <section className="order-summary">
        <h2>Order Summary</h2>
        <div className="summary-item"><span>Subtotal:</span><span>₹2,30,000</span></div>
        <div className="summary-item"><span>Tax:</span><span>18%</span></div>
        <div className="summary-item"><span>Tax Amount:</span><span>₹1888</span></div>
        <div className="summary-item"><span>Additional Discounts:</span><span>₹500</span></div>
        <div className="summary-item"><span>Shipping Charges:</span><span>₹1000</span></div>
        <div className="summary-item"><span>Other Charges:</span><span>₹100</span></div>
        <div className="summary-item total"><span>Total:</span><span>₹2,50,000</span></div>
      </section>

      {/* ---------- PAYMENT INFO ---------- */}
      <section className="payment-info">
        <div>
          <h2>Payment Information</h2>
          <p><strong>Payment Method:</strong> Credit (90 Days)</p>
          <p><strong>Payment Duration:</strong> 90 Days</p>
        </div>

        <div>
          <h2>Bank Details</h2>
          <p><strong>Account Name:</strong> Paw Chemical</p>
          <p><strong>Account No:</strong> 51234567890123</p>
          <p><strong>IFSC Code:</strong> BOB0001234</p>
        </div>
      </section>

      {/* ---------- SIGNATURE + FOOTER ---------- */}
      <footer className="invoice-footer">
        <div className="signature">
          <p>Signature</p>
          <h3>ERP AuriFlex</h3>
        </div>
        <p className="footer-note">
          Should you have any enquiries concerning this invoice, please contact +91 98722 76765<br />
          Flat 301, Sunshine Apartments, 27th Main HSR Layout, Sector 1
        </p>
      </footer>
    </div>
  );
};

export default SalesInvoices;
