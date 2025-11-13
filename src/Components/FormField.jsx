import React from 'react';
import './FormField.css';

export const InputField = ({
  label,
  required,
  value,
  onChange,
  placeholder,
  type = 'text',
  disabled,
  name
}) => (
  <div className="form-field">
    <label className="form-label">
      {label} {required && <span className="required">*</span>}
    </label>
    <input
      type={type}
      className="form-input"
      placeholder={placeholder}
      value={value || ''}  
      onChange={onChange}
      disabled={disabled}
      name={name}   
    />
  </div>
);

export const SelectField = ({
  label,
  required,
  value,
  onChange,
  options = [],
  placeholder,
  disabled,
  name
}) => (
  <div className="form-field">
    <label className="form-label">
      {label} {required && <span className="required">*</span>}
    </label>
    <select
      className="form-select"
      value={value || ''}  
      onChange={onChange}
      disabled={disabled}
      name={name}   
    >
      <option value="">{placeholder || "Select an option"}</option>
      {options.map((opt, index) => {
        const optionValue = typeof opt === "string" ? opt : opt.value;
        const optionLabel = typeof opt === "string" ? opt : opt.label;
        return (
          <option key={index} value={optionValue}>
            {optionLabel}
          </option>
        );
      })}
    </select>
  </div>
);

export const PriceField = ({
  label,
  required,
  value,
  onChange,
  currency,
  onCurrencyChange,
  name
}) => (
  <div className="form-field">
    <label className="form-label">
      {label} {required && <span style={{ color: "red" }}>*</span>}
    </label>
    <div className="price-combined-input">
      <div className="currency-dropdown">
        <select value={currency || 'IN (₹)'} onChange={onCurrencyChange} name="currency">  
          <option value="IN (₹)">IN (₹)</option>
          <option value="US ($)">US ($)</option>
          <option value="EU (€)">EU (€)</option>
        </select>
      </div>
      <input
        type="number"
        className="price-input"
        placeholder="Enter amount"
        value={value || ''}  
        onChange={onChange}
        name={name}   
      />
    </div>
  </div>
);

export const DateField = ({
  label,
  required,
  value,
  onChange,
  name
}) => (
  <div className="form-field">
    <label className="form-label">
      {label} {required && <span className="required">*</span>}
    </label>
    <input
      type="date"
      className="form-input"
      value={value || ''}  
      onChange={onChange}
      name={name}   
    />
  </div>
);

export const WeightField = ({
  label,
  required,
  value,
  onChange,
  unit,
  onUnitChange,
  options = [],
  placeholder = "Enter weight",
  disabled,
  name
}) => (
  <div className="form-field">
    <label className="form-label">
      {label} {required && <span className="required">*</span>}
    </label>
    <div className="input-with-select">
      <input
        type="number"
        className="weight-input"
        placeholder={placeholder}
        value={value || ''}  
        onChange={onChange}
        disabled={disabled}
        name={name}   
      />
      <select
        className="unit-select"
        value={unit || ''}  
        onChange={onUnitChange}
        disabled={disabled}
        name="unit"   
      >
        {options.map((opt, index) => (
          <option key={index} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  </div>
);
