import React, { useEffect, useState } from "react";
import "./EditableData.css";
import Front from "../assets/front.svg";
import Pagination from "./Pagination";

const EditableData = ({
  columns = [],
  data = [],
  onChange,
  showPagination = false,
}) => {
  const [rows, setRows] = useState(data);
  const [editingCell, setEditingCell] = useState({ id: null, key: null });

  useEffect(() => {
    setRows(data);
  }, [data]);

  const handleEdit = (id, key) => setEditingCell({ id, key });

  const handleChange = (id, key, value) => {
    const updated = rows.map((row) =>
      row.id === id ? { ...row, [key]: value } : row
    );
    setRows(updated);
    onChange?.(updated);
  };

  const handleBlur = () => setEditingCell({ id: null, key: null });

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === "Escape") e.currentTarget.blur();
  };

  // ✅ Compute totals dynamically
  const totals = {
    quantity: 0,
    taxAmt: 0,
    discountAmt: 0,
    totalAmt: 0,
  };

  rows.forEach((row) => {
    if (row.id === "total") return;

    const qty = parseFloat(row.QuantityOrdered) || 0;
    const unitPrice = parseFloat(row.UnitPrice) || 0;
    const taxPercent = parseFloat(row.TaxPercent) || 0;
    const discountPercent = parseFloat(row.DiscountPercent) || 0;

    const rowSubtotal = qty * unitPrice;
    const rowTaxAmt = (rowSubtotal * taxPercent) / 100;
    const rowDiscountAmt = (rowSubtotal * discountPercent) / 100;
    const rowTotal = rowSubtotal + rowTaxAmt - rowDiscountAmt;

    totals.quantity += qty;
    totals.taxAmt += rowTaxAmt;
    totals.discountAmt += rowDiscountAmt;
    totals.totalAmt += rowTotal;
  });

  return (
    <div className="editable-table">
      <table>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key}>{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              {columns.map((col) => {
                if (col.key === "ProductName") {
                  const isEditingMain =
                    editingCell.id === row.id &&
                    editingCell.key === "ProductName";
                  const isEditingBrand =
                    editingCell.id === row.id && editingCell.key === "Brand";

                  return (
                    <td key={col.key} className="td-product">
                      <div className="product-cell">
                        <div
                          className="product-line"
                          onClick={() => handleEdit(row.id, "ProductName")}
                        >
                          <img
                            src={Front}
                            alt="cell-icon"
                            className="cell-icon"
                          />
                          {isEditingMain ? (
                            <input
                              type="text"
                              value={row.ProductName ?? ""}
                              autoFocus
                              onChange={(e) =>
                                handleChange(
                                  row.id,
                                  "ProductName",
                                  e.target.value
                                )
                              }
                              onBlur={handleBlur}
                              onKeyDown={handleKeyDown}
                            />
                          ) : (
                            <div className="product-title">
                              {row.ProductName}
                            </div>
                          )}
                        </div>

                        <div
                          className="brand-line"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEdit(row.id, "Brand");
                          }}
                        >
                          {isEditingBrand ? (
                            <input
                              type="text"
                              value={row.Brand ?? ""}
                              autoFocus
                              onChange={(e) =>
                                handleChange(row.id, "Brand", e.target.value)
                              }
                              onBlur={handleBlur}
                              onKeyDown={handleKeyDown}
                              className="brand-input"
                              placeholder="Brand"
                            />
                          ) : (
                            <div className="sub-line">
                              Brand – {row.Brand ?? ""}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                  );
                }

                const isEditing =
                  editingCell.id === row.id && editingCell.key === col.key;

                return (
                  <td
                    key={col.key}
                    onClick={() =>
                      col.editable ? handleEdit(row.id, col.key) : null
                    }
                  >
                    {isEditing ? (
                      <input
                        type="text"
                        value={row[col.key] ?? ""}
                        autoFocus
                        onChange={(e) =>
                          handleChange(row.id, col.key, e.target.value)
                        }
                        onBlur={handleBlur}
                        onKeyDown={handleKeyDown}
                      />
                    ) : (
                      row[col.key]
                    )}
                  </td>
                );
              })}
            </tr>
          ))}

          {/* ✅ Totals Row */}
          <tr className="totals-row">
            {columns.map((col) => {
              switch (col.key) {
                case "ProductName":
                  return <td key={col.key}>Total</td>;
                case "QuantityOrdered":
                  return <td key={col.key}>{totals.quantity}</td>;
                case "TaxPercent":
                  return <td key={col.key}>₹{totals.taxAmt.toFixed(2)}</td>;
                case "DiscountPercent":
                  return (
                    <td key={col.key}>₹{totals.discountAmt.toFixed(2)}</td>
                  );
                case "TotalAmt":
                  return <td key={col.key}>₹{totals.totalAmt.toFixed(2)}</td>;
                default:
                  return <td key={col.key}></td>;
              }
            })}
          </tr>

          {/* ✅ Add Product Button Row */}
          <tr>
            <td colSpan={columns.length} className="add-row">
              <button className="add-btn">+ Add Product</button>
            </td>
          </tr>

          {/* ✅ Pagination Row (only if enabled) */}
          {showPagination && (
            <tr>
              <td colSpan={columns.length} className="pagination-row">
                <Pagination totalPages={10} />
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EditableData;
